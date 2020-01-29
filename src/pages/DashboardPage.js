import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Header, Segment, Statistic, List, Button, Icon, Message } from 'semantic-ui-react'

import BotGrid from '../components/BotGrid'
import { GET_ME_DETAILED } from '../gql/user'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../hooks/authentication'

const NUM_STATISTICS = 4

const statisticListStyle = {
  display: 'grid',
  gridTemplateColumns: `repeat(${NUM_STATISTICS}, 1fr)`
}

const statisticSegmentStyle = {
  background: 'white'
}

const DashboardPage = () => {
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_ME_DETAILED)

  if (!isLoggedIn()) {
    return <Message error> <Message.Header> Unauthorized </Message.Header> Must be logged-in to view dashboard. </Message>
  }

  return (
    <Segment>
      <Header as='h2' dividing> Dashboard </Header>
      <Segment textAlign='center' style={statisticSegmentStyle}>
        <List horizontal divided style={statisticListStyle}>
          <List.Item> <Statistic label="Total Wins" value={12} /> </List.Item>
          <List.Item> <Statistic style={{ lineHeight: 1 }} label="Best Individual Wins" value={3} /> </List.Item>
          <List.Item> <Statistic label="Best Ranking" value={'#5'} /> </List.Item>
          <List.Item> <Statistic label="Bots" value={7} /> </List.Item>
        </List>
      </Segment>
      <Button.Group fluid size='large' widths={4}>
        <Button as={Link} to='/create-bot'><Icon name='write'/> Create New Bot</Button>
        <Button as={Link} to='/settings'><Icon name='cog' /> Account Settings</Button>
        <Button as={Link} to='/help'><Icon name='question' /> Help</Button>
        {/* <Button><Icon name='sign-out' /> Logout</Button> */}
      </Button.Group>
      <Header dividing as='h3'> My Bots </Header>
      {(userLoading && !userData)
        ? <Segment loading padded='very' />
        : userError
          ? <p> An Error Occurred </p>
          : <BotGrid
            bots={userData.me.createdBots}
            hideAuthor={true}
            showEdit={true}
            showButtons={true}
          />
      }
    </Segment>
  )
}

export default DashboardPage
