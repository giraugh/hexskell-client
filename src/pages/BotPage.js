import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

import BotItem from '../components/BotItem'
import { GET_BOT } from '../gql/bot'

const BotPage = () => {
  const { id } = useParams()
  const { loading: botLoading, error: botError, data: botData } = useQuery(GET_BOT, { variables: { id } })

  if (botLoading && !botData) { return <Segment loading padded='very' /> }
  if (botError) { return <p> An Error occured </p> }

  return <BotItem data={botData.bot} hideBotLink={true} />
}

export default BotPage
