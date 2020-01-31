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
  query Bots (
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
