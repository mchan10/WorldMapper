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
			const maps = await Map.find({owner: _id}).sort({updatedAt:-1});
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
		addNewMap: async (_, __, { req }) => {
			const owner = new ObjectId(req.userId);
			const objectId = new ObjectId();
			const newMap = new Map({
				_id: objectId,
				owner: owner,
				name: 'New Map',
				region: 'abc'
			})
			const updated = await newMap.save();
			if(updated) return newMap._id;
			else return ('Could not add map');
		}
	}
}