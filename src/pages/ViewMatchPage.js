import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Segment, Select } from 'semantic-ui-react'
import propTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import TurnControls from '../components/TurnControls'
import Board, { transformBoardData, boardAtTurn } from '../components/Board'
import { GET_MATCH } from '../gql/match'

const roundOptions = [
  { key: 'r1', text: 'Round 1', value: 0 },
  { key: 'r2', text: 'Round 2', value: 1 },
  { key: 'r3', text: 'Round 3', value: 2 },
  { key: 'r4', text: 'Round 4', value: 3 }
]

const ViewMatchPage = ({ id }) => {
  const [selectedRound, setSelectedRound] = useState(0)
  const [currentTurn, setCurrentTurn] = useState(0)
  const [boardData, setBoardData] = useState(null)
  const { loading: matchLoading, error: matchError, data: matchData, refetch: refetchMatch } = useQuery(
    GET_MATCH,
    {
      variables: { id }
    }
  )

  const handleSelectedRoundChange = (round) => {
    setSelectedRound(round)
    refetchMatch()
  }

  const handleTurnChange = useCallback(turn => setCurrentTurn(turn), [])

  // Calculate board data only when deps change (using effect over memo to ensure no unnecessary recalc)
  useEffect(() => {
    if (matchData) {
      const rounds = matchData.match.rounds
      const boardJSON = rounds[selectedRound].terminalStateStr
      const boardDataArr = JSON.parse(boardJSON)
      setBoardData(transformBoardData(boardDataArr))
    }
  }, [matchData, selectedRound])

  // Calculate and memoize turn data
  const turnData = useMemo(() => {
    if (boardData) {
      return boardAtTurn(boardData, currentTurn)
    }
  }, [boardData, currentTurn])

  // Render loading bar if no data yet
  if (matchLoading || matchError || !matchData || !boardData) {
    return <Segment loading padded='very' />
  }

  // Render board and controls
  return <Segment>
    <Select options={roundOptions} value={selectedRound} onChange={(_, { value }) => handleSelectedRoundChange(value)}/>
    <TurnControls boardData={boardData} onTurnChange={handleTurnChange} />
    <Board boardData={turnData} />
  </Segment>
}

ViewMatchPage.propTypes = {
  id: propTypes.string
}

export default ViewMatchPage
