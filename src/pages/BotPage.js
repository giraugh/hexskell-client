import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams, Link } from 'react-router-dom'
import { Segment, Header, Container, Divider, List, Statistic } from 'semantic-ui-react'

import { GET_BOT } from '../gql/bot'
import { BotCodeViewer } from '../components/BotCodeDisplay'

const NUM_STATISTICS = 4

const statisticListStyle = {
  display: 'grid',
  gridTemplateColumns: `repeat(${NUM_STATISTICS}, 1fr)`
}

const statisticSegmentStyle = {
  background: 'white'
}

const BotPage = () => {
  const { id } = useParams()
  const { loading: botLoading, error: botError, data: botData } = useQuery(GET_BOT, { variables: { id } })

  if (botLoading && !botData) { return <Segment loading padded='very' /> }
  if (botError) { return <p> An Error occured </p> }

  const { name, author, code, published } = botData.bot
  return (
    <Segment>
      <Container>
        <Header as='h2' style={{ marginBottom: '3px' }}>
          { name }
        </Header>
        <span className='author'>Created by <Link to={`/user/${author.id}`}>{author.displayName}</Link> </span>
        <Divider/>
      </Container>

      <Segment textAlign='center' style={statisticSegmentStyle}>
        {published
          ? <>
            <List horizontal divided style={statisticListStyle}>
              <List.Item> <Statistic label="Wins" value={12} /> </List.Item>
              <List.Item> <Statistic label="Ties" value={2}/> </List.Item>
              <List.Item> <Statistic label="Ranked" value={`#${5}`} /> </List.Item>
              <List.Item> <Statistic label="Total Matches" value={25} /> </List.Item>
            </List>
          </> : <>
            <Header as='h3'> Not Published Yet </Header>
          </>
        }
      </Segment>

      <Divider/>

      <BotCodeViewer value={code} />

    </Segment>
  )
}

export default BotPage
