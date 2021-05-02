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
		addNewMap: String!
		changeMapName(_id: String!, name: String!): String
		deleteMap(_id: String!): Boolean
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