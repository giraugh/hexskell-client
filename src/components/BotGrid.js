import React from 'react'
import { Card, Container } from 'semantic-ui-react'
import propTypes from 'prop-types'

import BotItem from './BotItem'

const groupStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  justifyItems: 'center',
  margin: 'auto'
}

const BotGrid = ({ bots, ...opts }) => (
  <Container>
    <Card.Group style={groupStyle}>
      {bots.map(bot => (
        <BotItem key={bot.id} data={bot} {...opts} />
      ))}
    </Card.Group>
  </Container>
)

BotGrid.propTypes = {
  bots: propTypes.arrayOf(propTypes.object)
}

export default BotGrid
