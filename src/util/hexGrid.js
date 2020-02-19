const hex = (x, y, w = 30, h = 35, f = 0.6) => [
  x - w, y - h * f,
  x, y - h,
  x + w, y - h * f,
  x + w, y + h * f,
  x, y + h,
  x - w, y + h * f
]

const hexGrid = (
  gridX = 0,
  gridY = 0,
  gridWidth = 11,
  gridHeight = 11,
  hexWidth = 20,
  hexHeight = 25,
  hexPoint = 0.6,
  spacing = 7
) => {
  const hexes = []
  for (let i = 1; i <= gridWidth; i++) {
    for (let j = 1; j <= gridHeight; j++) {
      const rowOffset = (j * (hexWidth + spacing / 2))
      const colOffset = -0.67 * j * hexPoint * hexHeight
      hexes.push(hex(
        gridX + rowOffset + i * (2 * hexWidth + spacing),
        gridY + colOffset + j * (2 * hexHeight + spacing),
        hexWidth, hexHeight, hexPoint
      ))
    }
  }
  return hexes
}

const centeredGrid = (canvasWidth, canvasHeight, gridSize = 11, margin = 5, gridSpacing = 7) => {
  // Board is split into thirds, 1st 3rd is left tri, 2nd 3rd is square, 3rd 3rd is right tri
  const hexPoint = 0.6
  const hexProportion = 1.4
  const gridSpace = canvasWidth - 2 * margin
  const thirdSpace = gridSpace / 3
  const hexWidth = (thirdSpace / (gridSize + 1)) - gridSpacing / 2
  const verticalSpacing = (1 - hexPoint) * gridSpacing
  const hexHeight = (hexWidth * hexProportion) - verticalSpacing
  const totalGridHeight = (2 * hexHeight + (gridSpacing / 2)) * gridSize
  const xPos = margin
  const yPos = margin + ((canvasHeight - (margin)) / 2) - (totalGridHeight / 2)
  return hexGrid(
    xPos, yPos,
    gridSize, gridSize,
    hexWidth, hexHeight,
    hexPoint, gridSpacing
  )
}

module.exports = {
  hex,
  hexGrid,
  centeredGrid
}
