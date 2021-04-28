const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map{
		_id: String!
		name: String!
		owner: String!
		region: Region!
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
	}
	extend type Mutation {
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
		region: Region!
	}
`;

module.exports = { typeDefs: typeDefs }