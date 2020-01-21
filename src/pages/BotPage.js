import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useParams } from 'react-router-dom'

import BotItem from '../components/BotItem'

const GET_BOT = gql`
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

const BotPage = () => {
  const { id } = useParams()
  const { loading: botLoading, error: botError, data: botData } = useQuery(GET_BOT, { variables: { id } })

  if (botLoading) { return <p> Loading... </p> }
  if (botError) { return <p> There was an error </p> }

  return <BotItem data={botData.bot} hideBotLink={true} />
}

export default BotPage
