import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useParams } from 'react-router-dom'
import dateFormat from 'dateformat'
import { Header, Segment } from 'semantic-ui-react'

import BotGrid from '../components/BotGrid'
import ProfilePicture from '../components/ProfilePicture'

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      displayName
      dateJoined
      avatarURL
      createdBots {
        id
        name
        author {
          id
          avatarURL
        }
      }
    }
  }
`

const UserPage = () => {
  const { id } = useParams()
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, { variables: { id } })

  if (userError) { return <p> There was an error: {JSON.stringify(userError)} </p> }
  if (userLoading) { return <Segment loading padded='very' /> }

  const { displayName, createdBots, dateJoined } = userData.user
  return <div>
    <Header as='h2'>
      <ProfilePicture size='large' />
      {displayName}
    </Header>
    <span> Making bots since {dateFormat(dateJoined, 'mmmm yyyy')} </span>
    <Segment>
      <div>
        <Header as='h3'> Bots </Header>
        <BotGrid bots={createdBots} hideAuthor={true} />
      </div>
    </Segment>
  </div>
}

export default UserPage
