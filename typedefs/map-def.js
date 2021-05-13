const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map{
		_id: String!
		name: String!
		owner: String!
		region: String!
	}
	type Region{
		_id: String!
		name: String!
		capital: String!
		leader: String!
		parent: String
		children: [String]
		landmarks: [String]
		owner: String!
	}
	extend type Query {
		getAllMaps: [Map]
		getAllRegions: [Region]
		getMapById(_id: String!): Map
	}
	extend type Mutation {
		addNewMap(name: String!): String!
		changeMapName(_id: String!, name: String!): String
		deleteMap(_id: String!): Boolean
		addSubregion(_id: String!, region: RegionInput): String
		updateAccess(_id: String!): Boolean
		orderSubregions(_id: String!, subregion: [String]): [String]
		updateField(_id: String!, field: String!, value: String!): Boolean
		deleteRegion(_id: String!): [Region]
		addMultipleRegions(_id: String!, index: Int!, regions: [RegionInput]): Boolean
		addLandmark(_id: String!, value: String!, index: Int!): Boolean
	}
	input RegionInput {
		_id: String!
		name: String!
		capital: String!
		leader: String!
		parent: String
		children: [String]
		landmarks: [String]
		owner: String!
	}
	input MapInput {
		_id: String!
		name: String!
		owner: String!
		region: String!
	}
`;

module.exports = { typeDefs: typeDefs }