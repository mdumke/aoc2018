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
  const grid = Array.from(Array(300), () => Array(300).fill(null))
  return grid.map((row, i) => row.map((col, j) => getCellFuel(i, j, serial)))
}

// returns the fuel level of the given (0-indexed!) cell
const getCellFuel = (row, col, serial) => {
  const id = col + 1 + 10
  return Math.floor(((id * (row + 1) + serial) * id) / 100 % 10) - 5
}

module.exports = {
  getFuelGrid,
  findLargestPatch,
  findLargestPatchOfAnySize
}
