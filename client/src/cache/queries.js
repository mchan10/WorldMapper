import { gql } from '@apollo/client';

export const GET_DB_USER = gql`
    query GetDBUser{
        getCurrentUser{
            _id
            firstName
            lastName
            email
        }
    }
`

export const GET_DB_REGIONS = gql`
    query GetDBRegions{
        getAllRegions{
            _id
            name
            capital
            leader
            parent
            children
            landmarks
        }
    }
`

export const GET_DB_MAPS = gql`
    query GetDBMaps{
        getAllMaps{
            _id
            name
            owner
            region
        }
    }
`