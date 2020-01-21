import React from 'react'
import { Card } from 'semantic-ui-react'
import propTypes from 'prop-types'

import BotItem from './BotItem'

const BotGrid = ({ bots, ...opts }) => (
  <Card.Group centered>
    {bots.map(bot => (
      <BotItem key={bot.id} data={bot} {...opts} />
    ))}
  </Card.Group>
)

BotGrid.propTypes = {
  bots: propTypes.arrayOf(propTypes.object)
}

export default BotGrid
