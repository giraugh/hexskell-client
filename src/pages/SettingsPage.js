import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Segment, Header, Form, Container, Button, Message, Divider } from 'semantic-ui-react'

const GET_ME = gql`
  {
    me {
      id
      displayName
    }
  }
`

const SET_USER = gql`
  mutation setUser($displayName: String!) {
    setUser(displayName: $displayName) {
      id
      displayName
    }
  }
`

const SettingsPage = () => {
  const { loading, error, data } = useQuery(GET_ME)
  const [setUser] = useMutation(SET_USER)
  const [displayNameInput, setDisplayNameInput] = useState('')
  const [errorDisplay, setErrorDisplay] = useState(null)

  const handleDisplayNameChange = displayName => {
    setUser({ variables: { displayName } })
      .then(_ => {
        setErrorDisplay(null)
      })
      .catch(error => {
        error.graphQLErrors.forEach(err => {
          console.log(JSON.stringify(err))
          if (err.extensions.code === 'BAD_USER_INPUT') {
            setErrorDisplay(error.message.replace('GraphQL error: Bad Input: ', ''))
          } else {
            console.error(error)
          }
        })
      })
  }

  if (loading) { return <Segment loading padded='very' /> }
  if (error) { return <p> An error occured: {JSON.stringify(error)} </p> }

  const { displayName } = data.me
  return (
    <Segment>
      <Header as='h2'> Account Settings </Header>
      <Divider/>
      <Form error={!!errorDisplay}>
        <Header as='h3'> Display Name </Header>
        Current display name is <b> {displayName} </b>

        <Container style={{ marginTop: '1em' }}>
          <Form.Input
            label='Change your display name:'
            type='text'
            width={7}
            placeholder={displayName}
            value={displayNameInput}
            onChange={(e, v) => { setDisplayNameInput(v.value) }} />
          <Message
            error
            header='Action Forbidden'
            content={errorDisplay}
          />
          <Form.Field control={Button} onClick={_ => handleDisplayNameChange(displayNameInput)} content='Change Display Name'/>
        </Container>
      </Form>
    </Segment>
  )
}

export default SettingsPage
