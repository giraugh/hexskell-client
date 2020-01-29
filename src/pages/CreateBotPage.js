import React, { useState } from 'react'
import { Segment, Header, Message, Form, Container, Button } from 'semantic-ui-react'

import { isLoggedIn } from '../hooks/authentication'
import { useMutation } from '@apollo/react-hooks'
import { NEW_BOT } from '../gql/bot'
import { Redirect } from 'react-router-dom'

const CreateBotPage = () => {
  const [redirectTo, setRedirectTo] = useState(null)
  const [errorDisplay, setErrorDisplay] = useState(null)
  const [nameInput, setNameInput] = useState('')
  const [newBot] = useMutation(NEW_BOT)

  // Must be logged in
  if (!isLoggedIn()) {
    return <Message error> <Message.Header> Unauthorized </Message.Header> Must be logged-in to create a new bot. </Message>
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }

  const handleSubmitForm = () => {
    // Name is required
    if (nameInput.length === 0 || !nameInput) {
      setErrorDisplay('Name field is required')
      return
    }

    // Perform mutation
    newBot({ variables: { name: nameInput, code: '' } })
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
      .then(({ data }) => {
        setErrorDisplay(null)
        setRedirectTo(`/create-bot/continue/${data.newBot.id}`)
      })
  }

  return (
    <Segment>
      <Header as='h2' dividing> Create New Bot </Header>
      <Form error={!!errorDisplay}>
        <Container style={{ marginTop: '1em' }}>
          <Form.Input
            label='Bot name'
            type='text'
            width={7}
            placeholder={'Bot Name'}
            value={nameInput}
            onChange={(_, v) => { setNameInput(v.value) }} />
          <Message
            error
            header='Action Forbidden'
            content={errorDisplay}
          />
          <Form.Field control={Button} onClick={handleSubmitForm} content='Continue'/>
        </Container>
      </Form>
    </Segment>
  )
}

export default CreateBotPage
