import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useParams } from 'react-router-dom'
import dateFormat from 'dateformat'

import BotGrid from '../components/BotGrid'

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      displayName
      dateJoined
      createdBots {
        id
        name
      }
    }
  }
`

const UserPage = () => {
  const { id } = useParams()
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, { variables: { id } })

  if (userLoading) { return <p> Loading... </p> }
  if (userError) { return <p> There was an error </p> }

  const { displayName, createdBots, dateJoined } = userData.user
  return <div>
    <h2> {displayName} </h2>
    <span> Making bots since {dateFormat(dateJoined, 'mmmm yyyy')} </span>
    <div>
      <h3> bots </h3>
      <BotGrid bots={createdBots} hideAuthor={true} />
    </div>
  </div>
}

export default UserPage
