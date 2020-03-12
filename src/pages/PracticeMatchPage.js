import React, { useState, useMemo } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Segment, Header, Button, Icon } from 'semantic-ui-react'
import propTypes from 'prop-types'

import TurnControls from '../components/TurnControls'
import Board, { transformBoardData, boardAtTurn } from '../components/Board'
import MessagesDisplay from '../components/MessagesDisplay'
import { BotCodeEditor } from '../components/BotCodeDisplay'
import { useLoggedIn } from '../hooks/authentication'
import { PERFORM_TEST_ROUND } from '../gql/match'

const DO_NOTHING = () => {}

const PracticeMatchPage = () => {
  const [scripts, setScripts] = useState(['', ''])
  const [messages, setMessages] = useState([[], []])
  const [boardData, setBoardData] = useState()
  const [currentTurn, setCurrentTurn] = useState(0)
  const [matchLoading, setMatchLoading] = useState(false)
  const [performTestRound] = useMutation(PERFORM_TEST_ROUND)

  const handleApplyCode = index => value => {
    // Can't update code while game is loading
    if (!matchLoading) {
      // Merge old and new scripts
      const newScripts = [
        index === 0 ? value : scripts[0],
        index === 1 ? value : scripts[1]
      ]

      // Update state
      setScripts(newScripts)

      // Perform match query
      // 0th script is red player
      // 1st script is blue player
      setMatchLoading(true)
      performTestRound({ variables: { scripts: newScripts } })
        .then(({ data: { competeScripts } }) => {
          setMatchLoading(false)
          handleMatchResult(competeScripts)
        })
    }
  }

  const decorateMessages = messages => messages.map(m => {
    if (boardData) {
      const gameLength = boardData.red.length + boardData.blue.length
      return {
        ...m,
        active: m.isError ? currentTurn === gameLength : m.turn <= currentTurn
      }
    } else {
      return m
    }
  })

  const handleMatchResult = result => {
    // Save messages
    const logs = result.botLogs
    const errors = result.botErrors
    const gameState = JSON.parse(result.terminalStateStr)
    const gameLength = gameState.red.length + gameState.blue.length
    const allMessages = [
      ...errors.map(({ player, message }) => ({ player, message, isError: true, turn: gameLength + 1 })),
      ...logs.map(({ player, message, turn }) => ({ player, message, turn, isError: false }))
    ]

    setMessages([
      allMessages.filter(message => message.player.toLowerCase() === 'red'),
      allMessages.filter(message => message.player.toLowerCase() === 'blue')
    ])

    // Save board data
    setBoardData(transformBoardData(gameState))
  }

  // Calculate and memoize turn data
  const turnData = useMemo(() => {
    if (boardData) {
      return boardAtTurn(boardData, currentTurn)
    }
  }, [boardData, currentTurn])

  return (
    <Segment>
      <TurnControls boardData={boardData} onTurnChange={setCurrentTurn} />
      <Board boardData={boardData ? turnData : undefined} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 10 }}>
        <BotCodeEditorPanel
          title={'Bot 1'}
          onApplyCode={handleApplyCode(0)}
          messages={decorateMessages(messages[0])}
          matchLoading={matchLoading}
        />
        <BotCodeEditorPanel
          title={'Bot 2'}
          onApplyCode={handleApplyCode(1)}
          messages={decorateMessages(messages[1])}
          matchLoading={matchLoading}
        />
      </div>
    </Segment>
  )
}

const DEFAULT_BOT_CODE = '// default bot code'

const BotCodeEditorPanel = ({ title, onApplyCode = DO_NOTHING, onSave = DO_NOTHING, messages = [], matchLoading }) => {
  const { loggedIn } = useLoggedIn()
  const [currentCode, setCurrentCode] = useState(DEFAULT_BOT_CODE)
  const [appliedCode, setAppliedCode] = useState(DEFAULT_BOT_CODE)

  const handleReset = () => setCurrentCode(DEFAULT_BOT_CODE)
  const handleClear = () => setCurrentCode('')
  const handleCodeChanged = (value) => setCurrentCode(value)

  const handleSaveBot = () => {
    onSave(currentCode)
  }

  const handleApplyCode = () => {
    setAppliedCode(currentCode)
    onApplyCode(currentCode)
  }

  const changedSinceApplication = currentCode !== appliedCode
  return (
    <div>
      <Header as='h2' style={{ marginLeft: 10, marginBottom: 0 }}> { title } { changedSinceApplication && '•' } </Header>
      <BotCodeEditor
        value={currentCode}
        onChange={handleCodeChanged}
        extraStyle={{ borderRadius: '5px 5px 0px 0px', borderBottom: 'none' }}/>
      <Button.Group compact style={{ width: '100%' }}>
        <Button style={{ borderRadius: 0 }} onClick={handleApplyCode} disabled={matchLoading}> <Icon name='save' /> Update </Button>
        <Button style={{ borderRadius: 0 }} onClick={handleReset}> <Icon name='redo' /> Reset </Button>
        <Button style={{ borderRadius: 0 }} onClick={handleClear}> <Icon name='delete' /> Clear </Button>
        <Button style={{ borderRadius: 0 }} onClick={handleSaveBot} disabled={!loggedIn || changedSinceApplication}> <Icon name='upload' /> Save as Bot </Button>
      </Button.Group>
      <MessagesDisplay messages={messages} titleStyle={{ marginTop: 20 }} />
    </div>
  )
}

BotCodeEditorPanel.propTypes = {
  title: propTypes.string,
  onApplyCode: propTypes.func,
  onSave: propTypes.func,
  messages: propTypes.array,
  matchLoading: propTypes.bool
}

export default PracticeMatchPage
