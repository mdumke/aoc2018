/*
 * energy level computations on a 300x300 grid according to spec
 *
 */

// return the top-left corner of the largest 3x3 patch
const findLargestPatch = serialNumber => {
  let currentLevel, x, y
  let maxLevel = -Infinity

  for (let i = 0; i < 300 - 3; i++) {
    for (let j = 0; j < 300 - 3; j++) {
      currentLevel = sumPatch(i, j, serialNumber)

      if (currentLevel > maxLevel) {
        maxLevel = currentLevel
        x = i
        y = j
      }
    }
  }

  return [x, y]
}

// returns the sum of specified 3x3 patch
const sumPatch = (x, y, serialNumber) => {
  const rackIds = getRackIds(x)
  const ys = getYCoords(y)

  return sumValues(
    addConstant(
      getHundredsDigits(
        multiply(
          addConstant(multiply(rackIds, ys), serialNumber),
          rackIds)),
      -5))
}

// helper functions for operations on 3x3 patches
const sumValues = p => p.reduce((sum, row) => sum + row.reduce((s, v) => s + v), 0)
const multiply = (p1, p2) => p1.map((row, i) => row.map((v, j) => v * p2[i][j]))
const addConstant = (p, c) => p.map(row => row.map(v => v + c))
const getRackIds = x => Array.from(Array(3), () => [x + 10, x + 11, x + 12])
const getYCoords = y => Array(3).fill(null).map((_, i) => [y + i, y + i, y + i])

const getHundredsDigits = p =>
  p.map(row => row.map(n => Number(n.toString().split('').reverse()[2] || 0)))

module.exports = {
  findLargestPatch,
  sumPatch
}
