const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');
const Region = require('../models/region-model')
// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of map objects on success, and an empty array on failure
		**/
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const maps = await Map.find({owner: _id}).sort({lastAccessed:-1});
			if(maps) return (maps);
		},

		getAllRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const regions = await Region.find({owner: _id});
			if(regions) return (regions);

		},
		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getMapById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const maps = await Map.findOne({_id: objectId});
			if(maps) return maps;
			else return ({});
		},
	},
	Mutation: {
		addNewMap: async (_, args, { req }) => {
			const { name } = args;
			const owner = new ObjectId(req.userId);
			const regionId = new ObjectId();
			const newRegion = new Region({
				_id: regionId,
				name: name,
				owner: owner,
				capital: 'No Capital',
				leader: 'No Leader',
				parent: '',
				children: [],
				landmarks: []
			})
			const addRegion = await newRegion.save();
			const objectId = new ObjectId();
			const timeElapsed = Date.now();
    		const today = new Date(timeElapsed);
			const newMap = new Map({
				_id: objectId,
				owner: owner,
				name: name,
				region: newRegion._id,
				lastAccessed: today
			})
			const updated = await newMap.save();
			if(updated) return newRegion._id;
			else return ('Could not add map');
		},
		changeMapName: async (_, args) => {
			const { _id, name} = args;
			const mapId = _id;
			const foundMap = await Map.findOne({_id: mapId});
			const regionId = foundMap.region;
			const updateRegion = await Region.updateOne({_id: regionId}, {name: name});
			const updateMap = await Map.updateOne({_id: mapId}, {name: name});
			if (updateMap){
				return name;
			}
			return "";
		},
		deleteMap: async (_, args) => {
			const { _id } = args;
			const mapId = _id;
			const foundMap = await Map.findOne({_id: mapId});
			let stack = [];
			stack.push(foundMap.region);
			while (stack.length > 0){
				let regionId = stack.pop();
				let region = await Region.findOne({_id: regionId});
				stack.push(...(region.children));
				let data = await Region.deleteOne({_id: regionId});
			}
			const deleted = await Map.deleteOne({_id: mapId});
			if (deleted) return true;
			return false;
		},
		addSubregion: async (_, args, { req }) => {
			const { _id, region } = args;
			const owner = new ObjectId(req.userId);
			const parentId = _id;
			if (region._id === ""){
				region._id = new ObjectId();
			}
			region.owner = owner;
			region.parent = parentId;
			const schemaRegion = new Region({
				...region
			})
			const foundParent = await Region.findOne({_id: parentId});
			foundParent.children.push(region._id);
			const updateRegion = await Region.updateOne({_id: parentId}, {children: foundParent.children});
			const updateSubregion = await schemaRegion.save();
			if (updateSubregion){
				return region._id;
			}
			return "";
		},
		updateAccess: async (_, args) => {
			const { _id } = args;
			const timeElapsed = Date.now();
    		const today = new Date(timeElapsed);
			const update = await Map.updateOne({_id: _id}, {lastAccessed: today});
			if (update){ return true}
			return false;
		},
		orderSubregions: async (_, args) => {
			const { _id, subregion } = args;
			const foundRegion = await Region.findOne({_id: _id});
			const oldSub = foundRegion.children;
			const update = await Region.updateOne({_id: _id}, {children: subregion});
			return oldSub;
		},
		updateField: async (_, args) => {
			const { _id, field, value} = args;
			let pair = {};
			pair[field] = value;
			const update = await Region.updateOne({_id: _id}, pair);
			if (update) {return true};
			return false;
		},
		deleteRegion: async (_, args) => {
			const { _id } = args;
			const foundRegion = await Region.findOne({_id: _id});
			const deleted = await Region.deleteOne({_id: _id});
			const parentId = foundRegion.parent;
			const foundParent = await Region.findOne({_id: parentId});
			const childrenIndex = foundParent.children.indexOf(_id);
			let newChild = [...foundParent.children];
			newChild.splice(childrenIndex, 1);
			const update = await Region.updateOne({_id: parentId}, {children: newChild});
			let accum = [];
			accum.push(foundRegion);
			let stack = [];
			stack.push(...foundRegion.children);
			while (stack.length > 0){
				let regionId = stack.pop();
				let region = await Region.findOne({_id: regionId});
				accum.push(region);
				stack.push(...(region.children));
				let data = await Region.deleteOne({_id: regionId});
			}
			return accum;
		},
		addMultipleRegions: async (_, args) => {
			const { _id, index, regions } = args;
			const parentRegion = await Region.findOne({_id: _id});
			let newChild = [...parentRegion.children];
			newChild.splice(index, 0, regions[0]._id);
			const update = await Region.updateOne({_id: _id}, {children: newChild});
			for (let i = 0; i < regions.length; i++){
				const updateRegion = new Region({
					...regions[i]
				});
				await updateRegion.save();
			}
			return true;
		},
		addLandmark: async (_, args) => {
			const { _id, value, index } = args;
			const foundRegion = await Region.findOne({_id: _id});
			let landmarks = [...foundRegion.landmarks]
			if (index === -1){
				landmarks.push(value);
			}
			else{
				landmarks.splice(index, 0, value);
			}
			const update = await Region.updateOne({_id: _id}, {landmarks: landmarks});
			return true;
		},
		removeLandmark: async (_, args) => {
			const { _id, index } = args;
			const foundRegion = await Region.findOne({_id: _id});
			let landmarks = [...foundRegion.landmarks];
			let removed = "";
			if (index === -1){
				removed = landmarks.pop();
			}
			else{
				removed = landmarks.splice(index, 1)[0];
			}
			const updated = await Region.updateOne({_id: _id}, {landmarks: landmarks});
			return removed;
		},
		editLandmark: async (_, args) => {
			const { _id, value, index} = args;
			const foundRegion = await Region.findOne({_id: _id});
			let landmarks = [...foundRegion.landmarks];
			let removed = landmarks.splice(index, 1, value);
			const updated = await Region.updateOne({_id: _id}, {landmarks: landmarks});
			return removed[0];
		},
		changeParent: async (_, args) => {
			const { _id, parentId, index} = args;
			const foundRegion = await Region.findOne({_id: _id});
			const currentParentId = foundRegion.parent;
			const foundCurrentParent = await Region.findOne({_id: currentParentId});
			let currentChildren = [...foundCurrentParent.children];
			const position = currentChildren.indexOf(_id);
			currentChildren.splice(position, 1);
			const updateCurrentParent = await Region.updateOne({_id: currentParentId}, {children: currentChildren});
			const updateRegion = await Region.updateOne({_id: _id}, {parent: parentId});
			const foundNewParent = await Region.findOne({_id: parentId});
			let newChildren = [...foundNewParent.children];
			if (index !== -1){
				newChildren.splice(index, 0, _id);
			}
			else{
				newChildren.push(_id);
			}
			const updateNewParent = await Region.updateOne({_id: parentId}, {children: newChildren});
			return position;
		}
	}
}