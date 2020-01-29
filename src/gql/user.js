import { gql } from 'apollo-boost'

export const SET_USER = gql`
  mutation setUser($displayName: String!) {
    setUser(displayName: $displayName) {
      id
      displayName
    }
  }
`

export const GET_ME = gql`
  {
    me {
      id
      displayName
    }
  }
`

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      displayName
      dateJoined
      avatarURL
      createdBots {
        id
        name
        author {
          id
          avatarURL
        }
      }
    }
  }
`
