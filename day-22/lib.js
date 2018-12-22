/*
 * build caves and find paths in them
 *
 */

const Queue = require('js-priority-queue')

const TORCH = 'torch'
const GEAR = 'gear'
const NEITHER = 'neither'

// returns the minutes it takes to the target using the fastest route
const findTarget = (cave, target) => {
  // UCS helper functions
  const isExplored = ({ row, col, tool }) =>
    visited[row] && visited[row][col] && visited[row][col][tool]

  const markExplored = ({ row, col, tool }) => {
    visited[row] = visited[row] || {}
    visited[row][col] = visited[row][col] || {}
    visited[row][col][tool] = true
  }

  const isGoalState = ({ row, col, tool }) =>
    row === target.row && col === target.col && tool === TORCH

  const fringe = new Queue({
    comparator: (a, b) => a.time - b.time,
    initialValues: [{ time: 0, tool: TORCH, row: 0, col: 0 }]
  })

  let current
  const visited = {}

  while (fringe.length) {
    current = fringe.dequeue()

    if (isGoalState(current)) break
    if (isExplored(current)) continue

    markExplored(current)

    for (let neighbor of getOptions(current, cave)) {
      if (!isExplored[neighbor]) fringe.queue(neighbor)
    }
  }

  return current.time
}

// returns available next steps including how much time they take
const getOptions = ({ tool, time, row, col }, cave) => {
  const options = []

  const allowed = {
    '.': [GEAR, TORCH],
    '=': [GEAR, NEITHER],
    '|': [TORCH, NEITHER]
  }

  // move where possible
  for (let [ x, y ] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
    if (row + x < 0 || col + y < 0) continue
    if (!allowed[cave[row + x][col + y]].includes(tool)) continue

    options.push({
      row: row + x,
      col: col + y,
      tool,
      time: time + 1
    })
  }

  // change to another tool
  for (let t of [TORCH, NEITHER, GEAR].filter(t => t !== tool)) {
    options.push({
      row,
      col,
      tool: t,
      time: time + 7
    })
  }

  return options
}

// returns a matrix of erosion levels
const getErosionLevels = (target, width, height, depth) => {
  const cave = Array.from(Array(height + 1), () => Array(width + 1).fill())

  const geoIndex = (row, col) => {
    if (row === 0 && col === 0) return 0
    if (row === target.row && col === target.col) return 0

    if (row === 0) return col * 16807
    if (col === 0) return row * 48271

    return cave[row][col - 1] * cave[row - 1][col]
  }

  for (let row = 0; row <= height; row++) {
    for (let col = 0; col <= width; col++) {
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

// returns a matrix of field-types for the specified cave
const buildCave = (target, width, height, depth) => {
  return getErosionLevels(target, width, height, depth).map(row => {
    return row.map(v => ['.', '=', '|'][v % 3])
  })
}

module.exports = {
  buildCave,
  computeRisk,
  findTarget,
  getErosionLevels
}
