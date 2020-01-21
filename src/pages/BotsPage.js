import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import BotGrid from '../components/BotGrid'

const GET_BOTS = gql`
  {
    bots {
      id
      name
      author {
        id
        displayName
      }
    }
  }
`

const BotsPage = () => {
  const { loading: botsLoading, error: botsError, data: botsData } = useQuery(GET_BOTS)

  if (botsLoading) { return <p> Loading ...</p> }
  if (botsError) { return <p> An Error occured </p> }

  const bots = botsData.bots
  return <BotGrid bots={bots} />
}

export default BotsPage
