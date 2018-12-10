/*
 * helper functions for finding the message in the sky
 *
 */

const fs = require('fs')
const { max, min } = require('../utils')

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
    show: display(advance(points, velocities, -1)) }
}

// returns a display-string with the message
const display = points => {
  const top = getTop(points)
  const left = getLeft(points)
  const height = getHeight(points)
  const width = getWidth(points)

  let msg = Array.from(Array(height + 1), () => Array(width + 1).fill(' '))
  points.forEach(([ x, y ]) => { msg[y - top][x - left] = '#' })

  return msg.reduce((memo, row) => memo + row.join('') + '\n', '')
}

// dimensions helpers
const getHeight = points => Math.abs(getTop(points) - getBottom(points))
const getWidth = points => Math.abs(getLeft(points) - getRight(points))

const getTop = points => points.map(([ x, y ]) => y).reduce(min)
const getBottom = points => points.map(([ x, y ]) => y).reduce(max)
const getLeft = points => points.map(([ x, y ]) => x).reduce(min)
const getRight = points => points.map(([ x, y ]) => x).reduce(max)

// returns points after adding velocities, direction is 1 or -1 (backwards)
const advance = (points, velocities, direction = 1) => {
  return points.map(([ x, y ], i) => [
    x + velocities[i][0] * direction,
    y + velocities[i][1] * direction
  ])
}

// input helpers
const getInput = cb =>
  fs.readFile('input.txt', 'utf8', (_, data) => cb(parseInput(data)))

const parseInput = data =>
  data.trim().split('\n').reduce((acc, line) => {
    const [ x, y, vx, vy ] = parseLine(line)

    return {
      points: [...acc.points, [x, y]],
      velocities: [...acc.velocities, [vx, vy]]
    }
  }, { points: [], velocities: [] })

const parseLine = line =>
  line
    .match(/< ?(\S+),  ?(\S+)>.*< ?(\S+),  ?(\S+)>/)
    .slice(1)
    .map(Number)

module.exports = {
  advance,
  getHeight,
  getInput,
  findMessage
}
