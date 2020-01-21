import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import BotGrid from '../components/BotGrid'
import { Segment, Pagination, Container } from 'semantic-ui-react'

const GET_BOTS = gql`
  {
    bots {
      id
      name
      author {
        id
        displayName
        avatarURL
      }
    }
  }
`

const BotsPage = () => {
  const { loading: botsLoading, error: botsError, data: botsData } = useQuery(GET_BOTS)

  if (botsLoading) { return <Segment loading padded='very' /> }
  if (botsError) { return <p> An Error occured </p> }

  const bots = botsData.bots
  return <Segment>
    <Container textAlign='center' style={{ paddingBottom: '3em' }}>
      <Container style={{ paddingBottom: '2em' }}>
        <Pagination
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={6}
        />
      </Container>
      <BotGrid bots={bots}/>
    </Container>
  </Segment>
}

export default BotsPage
