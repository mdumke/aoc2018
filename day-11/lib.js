/*
 * fuel level computations on a 300x300 grid according to spec
 *
 */

// returns the top-left corner and size of the largest possible patch
const findLargestPatchOfAnySize = grid => {
  let max = { level: -Infinity }

  for (let size = 1; size < 300; size++) {
    const [ col, row, level ] = findLargestPatch(size, grid)

    if (level > max.level) max = { level, col, row, size }
    if (level < 0) break
  }

  return [max.col, max.row, max.size]
}

// returns the top-left corner of the largest sizexsize patch
const findLargestPatch = (size, grid) => {
  let max = { level: -Infinity }

  for (let row = 0; row < 300 - size; row++) {
    for (let col = 0; col < 300 - size; col++) {
      const level = sumPatchAt(row, col, size, grid)

      if (level > max.level) {
        max = { level, row, col }
      }
    }
  }

  return [max.col + 1, max.row + 1, max.level]
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
