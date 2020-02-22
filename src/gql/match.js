import { gql } from 'apollo-boost'

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
