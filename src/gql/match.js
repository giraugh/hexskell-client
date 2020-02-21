import { gql } from 'apollo-boost'

export const GET_MATCH = gql`
  query getMatch($id: ID!) {
    match(id: $id) {
      rounds {
        terminalStateStr
      }
    }
  }
`
