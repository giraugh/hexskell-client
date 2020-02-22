import React from 'react'
import { Segment } from 'semantic-ui-react'
import propTypes from 'prop-types'

import MessagesDisplay from './MessagesDisplay'

const segmentStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '10px'
}

const BotMessages = ({ match, selectedRound, currentTurn = Infinity }) => {
  const competitors = match.competitors
  const round = match.rounds[selectedRound]
  const logs = match.botLogs.filter(({ round }) => round === selectedRound + 1)
  const errors = match.botErrors.filter(({ round }) => round === selectedRound + 1)

  const messages = [
    ...errors.map(({ player, message }) => ({ player, message, active: true, isError: true, turn: Infinity })),
    ...logs.map(({ player, message, turn }) => ({ player, message, active: turn <= currentTurn, turn, isError: false }))
  ]

  const redMessages = messages.filter(({ player }) => player.toLowerCase() === 'red')
  const blueMessages = messages.filter(({ player }) => player.toLowerCase() === 'blue')

  const firstCompetitorIsRed = round && round.redPlayer.name === competitors[0].name
  return (
    <Segment style={segmentStyle}>
      <MessagesDisplay messages={firstCompetitorIsRed ? redMessages : blueMessages} title={competitors[0].name} titleStyle={round && { color: firstCompetitorIsRed ? 'red' : 'blue' }} />
      <MessagesDisplay messages={!firstCompetitorIsRed ? redMessages : blueMessages} title={competitors[1].name} titleStyle={round && { color: !firstCompetitorIsRed ? 'red' : 'blue' }}/>
    </Segment>
  )
}

BotMessages.propTypes = {
  match: propTypes.object,
  selectedRound: propTypes.number,
  currentTurn: propTypes.number
}

export default BotMessages
