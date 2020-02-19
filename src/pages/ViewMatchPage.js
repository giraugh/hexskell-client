import React from 'react'
import { Segment } from 'semantic-ui-react'
import propTypes from 'prop-types'

import Board from '../components/Board'

const ViewMatchPage = ({ id }) => {
  return <Segment>
    <Board />
  </Segment>
}

ViewMatchPage.propTypes = {
  id: propTypes.object
}

export default ViewMatchPage
