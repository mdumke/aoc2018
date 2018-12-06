/*
 * finding points with closest manhattan distances
 *
 */

const fs = require('fs')

// returns all coordinates with total distance less than maxDist
const findSafeRegion = (coords, maxDist) => {
  const { top, left, width, height } = findBoundary(coords)

  const searchArea = {
    top: 0,
    left: 0,
    width: left + maxDist,
    height: top + maxDist
  }

  let safeRegion = []
  let totalDist

  for (let row = searchArea.top; row < searchArea.height; row++) {
    for (let col = searchArea.left; col < searchArea.width; col++) {
      totalDist = 0

      for (let c of coords) {
        totalDist += manhattan(c.top, c.left, row, col)

        if (totalDist >= maxDist) break
      }

      if (totalDist < maxDist) safeRegion.push({ top: row, left: col })
    }
  }

  return safeRegion
}

// returns the coordinates of the largest (finite) area of influence
const findLargestFiniteArea = coords => {
  const boundary = findBoundary(coords)
  const field = findClosestPoints(coords, boundary)
  const allAreas = getAreas(field)
  const exclude = getBoundaryPoints(field, boundary)

  let largest

  for (let id in allAreas) {
    if (id === 'null') continue
    if (exclude.indexOf(Number(id)) !== -1) continue

    if (!largest || allAreas[largest].length < allAreas[id].length) {
      largest = id
    }
  }

  return allAreas[largest]
}

// returns all points whose influence reaches the boundary
const getBoundaryPoints = (field, { width, height }) => {
  const rim = new Set()

  field.forEach((row, i) => row.forEach((entry, j) => {
    if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
      rim.add(Number(entry.id))
    }
  }))

  return Array.from(rim).sort()
}

// returns each point with its area of influence (a coordinate array)
const getAreas = field => {
  const areas = {}

  field.forEach((row, top) => {
    row.forEach((entry, left) => {
      areas[entry.id] = areas[entry.id] || []
      areas[entry.id].push({ top, left })
    })
  })

  return areas
}

// returns { id, dist }-matrix of closest points
const findClosestPoints = (coords, boundary) => {
  let field = setupField(coords, boundary)

  propagateLeft(field, boundary, updateClosestPoint)
  propagateRight(field, boundary, updateClosestPoint)
  propagateDown(field, boundary, updateClosestPoint)
  propagateUp(field, boundary, updateClosestPoint)

  return field
}

// moves a 1x2 window over each row to update the left value
const propagateLeft = (field, { height, width }, fn) => {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width - 1; col++) {
      field[row][col + 1] = fn(field[row][col], field[row][col + 1])
    }
  }
}

// moves a 1x2 window backwards over each row to update the right value
const propagateRight = (field, { height, width }, fn) => {
  for (let row = 0; row < height; row++) {
    for (let col = width - 1; col > 0; col--) {
      field[row][col - 1] = fn(field[row][col], field[row][col - 1])
    }
  }
}

// moves a 2x1 window over each column to update the lower value
const propagateDown = (field, { height, width }, fn) => {
  for (let col = 0; col < width; col++) {
    for (let row = 0; row < height - 1; row++) {
      field[row + 1][col] = fn(field[row][col], field[row + 1][col])
    }
  }
}

// moves a 2x1 window upwards over each column to update the upper value
const propagateUp = (field, { height, width }, fn) => {
  for (let col = 0; col < width; col++) {
    for (let row = height - 1; row > 0; row--) {
      field[row - 1][col] = fn(field[row][col], field[row - 1][col])
    }
  }
}

// returns the point-id and distance of the closest point
const updateClosestPoint = (first, next) => {
  if (first.dist + 1 > next.dist) return { ...next }
  if (first.dist + 1 < next.dist) return { ...first, dist: first.dist + 1 }

  // id is null for ties
  return { ...next, id: null }
}

// returns a matrix with boundary's dimensions and points set
const setupField = (coords, b) => {
  const matrix = Array.from(Array(b.height), () => {
    return Array(b.width).fill({ id: null, dist: Infinity })
  })

  coords.forEach((c, i) => {
    matrix[c.top - b.top][c.left - b.left] = { id: i, dist: 0 }
  })

  return matrix
}

// returns { top, left, width, height } of enclosing rectangle
const findBoundary = coords => {
  const lefts = coords.map(c => c.left).sort((a, b) => a - b)
  const tops = coords.map(c => c.top).sort((a, b) => a - b)

  return {
    top: tops[0],
    left: lefts[0],
    width: lefts[lefts.length - 1] - lefts[0] + 1,
    height: tops[tops.length - 1] - tops[0] + 1
  }
}

// returns the taxi-cab distance for two points
const manhattan = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

// returns a list of { top, left } coordinates
const getCoordinates = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    const coords = data
      .trim()
      .split('\n')
      .map(parseLine)

    cb(coords)
  })
}

// returns coordinate from the given line
const parseLine = line => {
  const coord = line
    .match(/^(\d+), (\d+)/)
    .slice(1)
    .map(Number)

  return { left: coord[0], top: coord[1] }
}

module.exports = {
  findBoundary,
  findClosestPoints,
  findSafeRegion,
  getAreas,
  getBoundaryPoints,
  getCoordinates,
  findLargestFiniteArea
}
