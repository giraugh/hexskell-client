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
export const GET_ME_DETAILED = gql`
  {
    me {
      id
      displayName
      dateJoined
      avatarURL
      createdBots {
        id
        name
        published
        wins
        ties
        ranking
        author {
          id
          avatarURL
        }
      }
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
        published
        wins
        ties
        ranking
        author {
          id
          avatarURL
        }
      }
    }
  }
`

export const GET_USER_STATS = gql`
  query getUserStats($id: ID!) {
    userStatistics(id: $id) {
      totalWins,
      bestRanking,
      bestIndividualWins,
      botCount
    }
  }
`

export const GET_MY_STATS = gql`
  query getMyStatistics {
    myStatistics {
      totalWins,
      bestRanking,
      bestIndividualWins,
      botCount
    }
  }
`
