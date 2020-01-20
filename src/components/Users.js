import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_ME = gql`
{
  me {
    id
    displayName
  }
}
`

const Users = () => {
  const { loading, error, data } = useQuery(GET_ME)

  if (loading) { return <p> Loading... </p> }
  if (error) { return <p> Error </p> }

  return [data.me].map(({ id, displayName }) => (
    <div key={id} style={{ border: '2px solid red' }}>
      <h1> {displayName} </h1>
      <p> {id} </p>
    </div>
  ))
}

export default Users
