import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import BotItem from '../components/BotItem'
import { GET_BOT } from '../gql/bot'

const BotPage = () => {
  const { id } = useParams()
  const { loading: botLoading, error: botError, data: botData } = useQuery(GET_BOT, { variables: { id } })

  if (botLoading) { return <p> Loading... </p> }
  if (botError) { return <p> There was an error </p> }

  return <BotItem data={botData.bot} hideBotLink={true} />
}

export default BotPage
