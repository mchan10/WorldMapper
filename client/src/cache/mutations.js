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
	mutation AddNewMap($name: String!){
		addNewMap(name: $name)
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

export const UPDATE_ACCOUNT = gql`
	mutation UpdateAccount($name: String!, $email: String!, $password: String!){
		updateAccount(name: $name, email: $email, password: $password)
	}
`

export const UPDATE_ACCESS = gql`
	mutation UpdateAccess($_id: String!){
		updateAccess(_id: $_id)
	}
`

export const ORDER_SUBREGION = gql`
	mutation OrderSubregion($_id: String!, $subregion: [String]){
		orderSubregions(_id: $_id, subregion: $subregion)
	}
`

export const UPDATE_FIELD = gql`
	mutation UpdateField($_id: String!, $field: String!, $value: String!){
		updateField(_id: $_id, field: $field, value: $value)
	}
`

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!){
		deleteRegion(_id: $_id){
			_id
            name
            capital
            leader
            parent
            children
            landmarks
			owner
		}
	}
`

export const ADD_MULTIPLE_REGIONS = gql`
	mutation AddMultipleRegions($_id: String!, $index: Int!, $regions: [RegionInput]){
		addMultipleRegions(_id: $_id, index: $index, regions: $regions)
	}
`

export const ADD_LANDMARK = gql`
	mutation AddLandmark($_id: String!, $value: String!, $index: Int!){
		addLandmark(_id: $_id, value: $value, index: $index)
	}
`

export const REMOVE_LANDMARK = gql`
	mutation RemoveLandmark($_id: String!, $index: Int!){
		removeLandmark(_id: $_id, index: $index)
	}
`

export const EDIT_LANDMARK = gql`
	mutation EditLandmark($_id: String!, $value: String!, $index: Int!){
		editLandmark(_id: $_id, value: $value, index: $index)
	}
`