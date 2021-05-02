import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			name
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_NEW_MAP = gql`
	mutation AddNewMap{
		addNewMap
	}
`
export const CHANGE_MAP_NAME = gql`
	mutation ChangeMapName($_id: String!, $name: String!){
		changeMapName(_id: $_id, name: $name)
	}
`
export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!){
		deleteMap(_id: $_id)
	}
`

export const ADD_SUBREGION = gql`
	mutation AddSubregion($_id: String!, $region: RegionInput){
		addSubregion(_id: $_id, region: $region)
	}
`