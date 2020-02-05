import { gql } from 'apollo-boost'

export const GET_BOT = gql`
  query getBot($id: ID!) {
    bot(id: $id) {
      id
      name
      code
      published
      wins
      ties
      ranking
      author {
        id
        displayName
      }
    }
  }
`

export const GET_BOTS = gql`
  query bots (
    $sortBy: BotSorting,
    $sortOrder: SortOrder,
    $filters: [BotFilter!],
    $search: String,
    $amount: Int,
    $offset: Int) {
      bots(input: {
        sortBy: $sortBy,
        sortOrder: $sortOrder,
        filters: $filters,
        search: $search,
        amount: $amount,
        offset: $offset
      }) {
        bots {
          id
          name
          published
          wins
          ties
          ranking
          author {
            id
            displayName
            avatarURL
          }
        }
        currentPage
        totalPages
      }
  }
`

export const GET_BOT_STATS = gql`
  query getBotStatistics($id: ID!) {
    botStatistics(id: $id) {
      wins,
      ties,
      ranking,
      numMatches
    }
  }
`

export const GET_BOT_STATS_DETAILED = gql`
  query getBotStatistics($id: ID!) {
    botStatistics(id: $id) {
      wins
      ties
      losses
      ranking
      numMatches
      winRate
      winRateRed
      winRateBlue
      redWinPercentage
      averageGameLength
    }
  }
`

export const NEW_BOT = gql`
  mutation newBot($name: String!, $code: String!) {
    newBot(name: $name, code: $code) {
      id
    }
  }
`

export const SET_BOT = gql`
  mutation setBot($id: ID!, $name: String!, $code: String!) {
    setBot(id: $id, name: $name, code: $code) {
      id
    }
  }
`

export const REMOVE_BOT = gql`
  mutation removeBot($id: ID!) {
    removeBot(id: $id) {
      id
    }
  }
`

export const UNPUBLISH_BOT = gql`
  mutation unpublishBot($id: ID!) {
    unpublishBot(id: $id) {
      id
      published
    }
  }
`
export const PUBLISH_BOT = gql`
  mutation publishBot($id: ID!) {
    publishBot(id: $id) {
      id
      published
      publishingStatus
    }
  }
`
