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

export const ADDNEWMAP = gql`
	mutation AddNewMap{
		addNewMap
	}
`
export const CHANGEMAPNAME = gql`
	mutation ChangeMapName($_id: String!, $name: String!){
		changeMapName(_id: $_id, name: $name)
	}
`
export const DELETEMAP = gql`
	mutation DeleteMap($_id: String!){
		deleteMap(_id: $_id)
	}
`