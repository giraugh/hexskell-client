import { gql } from 'apollo-boost'

export const GET_BOT = gql`
  query getBot($id: ID!) {
    bot(id: $id) {
      id
      name
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
