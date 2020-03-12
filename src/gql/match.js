import { gql } from 'apollo-boost'

export const PERFORM_TEST_ROUND = gql`
  mutation performTestRound($scripts: [String!]!) {
    competeScripts(scripts: $scripts) {
      terminalStateStr
      winner
      botLogs {
        message
        player
        turn
      }
      botErrors {
        message
        player
      }
    }
  }
`

export const GET_MATCH = gql`
  query getMatch($id: ID!) {
    match(id: $id) {
      competitors {
        id
        name
      }
      rounds {
        redPlayer {
          id
          name
        }
        bluePlayer {
          id
          name
        }
        terminalStateStr
      }
      botErrors {
        message
        round
        player
      }
      botLogs {
        message
        round
        turn
        player
      }
    }
  }
`
