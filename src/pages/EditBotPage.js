import React, { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Segment, Header, Form, Container, Button, Message } from 'semantic-ui-react'
import propTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { GET_BOT, SET_BOT } from '../gql/bot'
import { BotCodeEditor } from '../components/BotCodeDisplay'

const DO_NOTHING = () => {}

const EditBotPage = ({ isContinue, botID, redirect = true, handleDidSubmit = DO_NOTHING }) => {
  const { id: pageID } = useParams()
  const id = botID || pageID // Can be used as modal, where id is passed as prop
  const [nameInput, setNameInput] = useState('')
  const [codeInput, setCodeInput] = useState('')
  const [redirectTo, setRedirectTo] = useState(null)
  const [errorDisplay, setErrorDisplay] = useState(null)
  const [setBot] = useMutation(SET_BOT)

  const handleBotLoaded = ({ bot }) => {
    // Set name
    setNameInput(bot.name || '')

    // Set code but don't override if never set before
    if (!isContinue) {
      setCodeInput(bot.code || '')
    }
  }

  const { data: botData, loading: botLoading, error: botError } = useQuery(
    GET_BOT,
    {
      onCompleted: handleBotLoaded,
      variables: {
        id
      }
    }
  )

  const handleFormSubmit = () => {
    if (nameInput.length === 0 || !nameInput) {
      setErrorDisplay('Name field is required')
      return
    }

    if (codeInput.length === 0 || !codeInput) {
      setErrorDisplay('Code field is required')
      return
    }

    setBot({ variables: { id: botData.bot.id, name: nameInput, code: codeInput } })
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
        console.log(data)
        if (redirect) { setRedirectTo(`/bot/${data.setBot.id}`) }
        handleDidSubmit(data)
      })
  }

  if (botLoading && !botData && !isContinue) { return <Segment loading padding='very'/> }
  if (botError && !isContinue) { return <p> An Error Occurred </p> }

  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }

  return (
    <Segment>
      <Header as='h2' dividing> { isContinue ? 'Create New Bot' : 'Edit Bot' } </Header>
      <Form error={!!errorDisplay}>
        <Container style={{ marginTop: '1em' }}>
          {!isContinue &&
            <Form.Input
              label='Name'
              type='text'
              width={7}
              placeholder={'Bot Name'}
              value={nameInput}
              onChange={(_, v) => setNameInput(v.value)}
            />
          }

          <div className='field'>
            <label> Code </label>
            <BotCodeEditor
              onLoad={_ => {}}
              onChange={(value) => setCodeInput(value) }
              value={codeInput}
            />
          </div>
          <Message
            error
            header='Action Forbidden'
            content={errorDisplay}
          />
          <Form.Field
            control={Button}
            onClick={handleFormSubmit}
            content='Save'
          />
        </Container>
      </Form>
    </Segment>
  )
}

EditBotPage.propTypes = {
  isContinue: propTypes.bool,
  botID: propTypes.string,
  redirect: propTypes.bool,
  handleDidSubmit: propTypes.func
}

export default EditBotPage
