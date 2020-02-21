import React, { useState } from 'react'
import propTypes from 'prop-types'

import { centeredGrid } from '../util/hexGrid'

const redHex = '#e52c3d'
const blueHex = '#655de1'
const greyHex = '#333333'

const Board = ({ boardData }) => {
  const gridSize = 11
  const svgAspectWidth = 700
  const svgAspectHeight = 500
  const [polys] = useState(centeredGrid(svgAspectWidth, svgAspectHeight, gridSize))

  // Board data has cartesian positions indexed from 1 to 11 (not zero-indexed)
  // Defaults to empty board
  boardData = boardData || {
    red: [],
    blue: []
  }

  return (
    <div style={{ display: 'grid', justifyItems: 'center' }}>
      <svg viewBox={[0, 0, svgAspectWidth, svgAspectHeight]}>
        {
          polys.map((poly, i) => (
            <BoardHex key={i} i={i} poly={poly} gridSize={gridSize} boardData={boardData} />
          ))
        }
      </svg>
    </div>
  )
}

const BoardHex = ({ i, poly, gridSize, boardData }) => {
  const { red, blue } = boardData
  const xPos = 1 + Math.floor(i / gridSize)
  const yPos = 1 + i % gridSize
  const isRed = !!red.some(({ x, y }) => x === xPos && y === yPos)
  const isBlue = !isRed && !!blue.some(({ x, y }) => x === xPos && y === yPos)
  return (
    <polygon points={poly} style={{ fill: isRed ? redHex : (isBlue ? blueHex : greyHex) }}/>
  )
}

export const transformBoardData = ({ red, blue }) => {
  return {
    red: red.map(([x, y]) => ({ x, y })),
    blue: blue.map(([x, y]) => ({ x, y }))
  }
}

// Show only the checkers placed before turnNum (turnNum starts at 0)
export const boardAtTurn = ({ red, blue }, turnNum) => {
  const redNum = Math.floor((turnNum + 1) / 2)
  const blueNum = Math.floor((turnNum + 1) / 2 - 0.5)
  return {
    red: red.filter((_, i) => i < redNum),
    blue: blue.filter((_, i) => i < blueNum)
  }
}

Board.propTypes = {
  boardData: propTypes.object
}

BoardHex.propTypes = {
  i: propTypes.number,
  gridSize: propTypes.number,
  poly: propTypes.array,
  boardData: propTypes.object
}

export default Board
