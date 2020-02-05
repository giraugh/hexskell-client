import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams, Link } from 'react-router-dom'
import { Segment, Header, Container, Divider } from 'semantic-ui-react'

import { GET_BOT } from '../gql/bot'
import { BotCodeViewer } from '../components/BotCodeDisplay'
import { BotStatistics, BotDetailedStatistics } from '../components/Statistics'

const BotPage = () => {
  const { id } = useParams()
  const { loading: botLoading, error: botError, data: botData } = useQuery(GET_BOT, { variables: { id } })

  if (botLoading && !botData) { return <Segment loading padded='very' /> }
  if (botError) { return <p> An Error occured </p> }

  const { name, author, code, published } = botData.bot
  return (
    <Segment>
      <Container>
        <Header as='h2' style={{ marginBottom: '3px', fontStyle: published ? 'none' : 'italic' }}>
          { name }
        </Header>
        <span className='author'>
          Created by
          <Link to={`/user/${author.id}`}> {author.displayName} </Link>
          {!published &&
            <span> and is <span style={{ fontStyle: 'italic' }}> not published</span> yet </span>
          }
        </span>
      </Container>

      { published &&
        <>
          <BotStatistics id={id} />
        </>
      }

      <BotCodeViewer value={code} />

      <Segment>
        <Header> Detailed Stats </Header>
        <BotDetailedStatistics id={id} />
      </Segment>

      <Segment>
        <Header > Matches </Header>
      </Segment>

    </Segment>
  )
}

export default BotPage
