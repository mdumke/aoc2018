/*
 * build caves and find paths in them
 *
 */

// returns a matrix of erosion levels
const getErosionLevels = (target, depth) => {
  const cave = Array.from(Array(target.row + 1), () => Array(target.col + 1).fill())

  const geoIndex = (row, col) => {
    if (row === 0 && col === 0) return 0
    if (row === target.row && col === target.col) return 0

    if (col === 0) return row * 16807
    if (row === 0) return col * 48271

    return cave[row][col - 1] * cave[row - 1][col]
  }

  for (let row = 0; row < cave.length; row++) {
    for (let col = 0; col < cave[0].length; col++) {
      cave[row][col] = (geoIndex(row, col) + depth) % 20183
    }
  }

  return cave
}

// returns the sum of field-types across the area
const computeRisk = erosion => {
  return erosion.reduce((risk, row) => {
    return risk + row.reduce((sum, v) => sum + v % 3, 0)
  }, 0)
}

module.exports = {
  getErosionLevels,
  computeRisk
}
