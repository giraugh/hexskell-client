import { gql } from 'apollo-boost'

export const GET_MATCH = gql`
  query getMatch($competitors: [ID!]!) {
    match {

    }
  }
`
