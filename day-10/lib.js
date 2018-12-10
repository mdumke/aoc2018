/*
 * helper functions for finding the message in the sky
 *
 */

const fs = require('fs')
const { min, ascending } = require('../utils')

// returns the points when they are in message-position
const findMessage = (points, velocities) => {
  let height = getHeight(points)
  let prevHeight
  let seconds = 0

  // step until height gets bigger again
  while (true) {
    prevHeight = height
    height = getHeight(points)

    if (height > prevHeight) break

    points = advance(points, velocities)
    seconds++
  }

  // take a step back, to when height was smallest
  return {
    seconds: seconds - 1,
    show: display(advance(points, velocities, -1))
  }
}

// returns a display-string with the message
const display = points => {
  const top = points.map(p => p.y).reduce(min)
  const left = points.map(p => p.x).reduce(min)

  let message = Array.from(Array(getHeight(points) + 1), () =>
    Array(getWidth(points) + 1).fill(' ')
  )

  points.forEach(({ x, y }) => { message[y - top][x - left] = '#' })

  return message.reduce((memo, row) => memo + row.join('') + '\n', '')
}

// returns points after adding velocities, direction is 1 or -1 (backwards)
const advance = (points, velocities, direction = 1) => {
  return points.map(({ x, y }, i) => ({
    x: x + velocities[i].x * direction,
    y: y + velocities[i].y * direction
  }))
}

// returns the height of the enclosing rectangle
const getHeight = points => {
  const sorted = points.map(p => p.y).sort(ascending)
  return Math.abs(sorted[0] - sorted[points.length - 1])
}

// returns the width of the enclosing rectangle
const getWidth = points => {
  const sorted = points.map(p => p.x).sort(ascending)
  return Math.abs(sorted[0] - sorted[points.length - 1])
}

// input helpers
const getInput = cb =>
  fs.readFile('input.txt', 'utf8', (_, data) => cb(parseInput(data)))

const parseInput = data =>
  data.trim().split('\n').reduce((acc, line) => {
    const [ x, y, vx, vy ] = parseLine(line)

    return {
      points: [...acc.points, { x, y }],
      velocities: [...acc.velocities, { x: vx, y: vy }]
    }
  }, { points: [], velocities: [] })

const parseLine = line =>
  line
    .match(/< ?(\S+),  ?(\S+)>.*< ?(\S+),  ?(\S+)>/)
    .slice(1)
    .map(Number)

module.exports = {
  advance,
  display,
  getHeight,
  getInput,
  findMessage
}
