/*
 * fuel level computations on a 300x300 grid according to spec
 *
 */

// returns the top-left corner and size of the largest possible patch
const findLargestPatchOfAnySize = serialNumber => {
  const grid = getFuelGrid(serialNumber)
  let maxLevel = -Infinity
  let maxRow, maxCol, maxSize

  for (let size = 1; size < 300; size++) {
    const [ col, row, level ] = findLargestPatch(size, grid)

    if (level > maxLevel) {
      maxLevel = level
      maxSize = size
      maxRow = row
      maxCol = col
    }

    if (level < 0) break
  }

  return [maxCol, maxRow, maxSize]
}

// returns the top-left corner of the largest sizexsize patch
const findLargestPatch = (size, grid) => {
  let currentLevel, row, col
  let maxLevel = -Infinity

  for (let i = 0; i < 300 - size; i++) {
    for (let j = 0; j < 300 - size; j++) {
      currentLevel = sumPatchAt(i, j, size, grid)

      if (currentLevel > maxLevel) {
        maxLevel = currentLevel
        row = i
        col = j
      }
    }
  }

  return [col + 1, row + 1, maxLevel]
}

// returns the sum of specified sizexsize patch
const sumPatchAt = (x, y, size, grid) => {
  let sum = 0

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      sum += grid[x + i][y + j]
    }
  }

  return sum
}

// return the 300x300 grid for the given serial number
const getFuelGrid = serial => {
  const size = 300
  const idOffset = 11

  const rackIds = Array.from(Array(size), () => {
    return Array(size).fill(null).map((_, i) => idOffset + i)
  })
  const ys = Array(size).fill(null).map((_, i) => Array(size).fill(1 + i))
  const hundreds = patch => patch.map(row => row.map(n => {
    return Number(n.toString().split('').reverse()[2] || 0)
  }))
  const multiply = (p1, p2) => p1.map((row, i) => row.map((v, j) => v * p2[i][j]))
  const addConst = (p, c) => p.map(row => row.map(v => v + c))

  return addConst(
    hundreds(multiply(addConst(multiply(rackIds, ys), serial), rackIds)),
    -5
  )
}

module.exports = {
  getFuelGrid,
  findLargestPatch,
  findLargestPatchOfAnySize
}
