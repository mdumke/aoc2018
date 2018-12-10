// returns the points when they are in message-position
const findMessage = (points, velocities) => {
  let candidates = points
  let seconds = 0

  let prevHeight = Infinity
  let height = getHeight(points)

  while (true) {
    prevHeight = height
    height = getHeight(candidates)

    if (height > prevHeight) break

    candidates = advance(candidates, velocities)
    seconds++
  }

  return {
    seconds: seconds - 1,
    show: display(rollback(candidates, velocities)) }
}

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

const getTop = points => Math.min(...points.map(([ x, y ]) => y))
const getBottom = points => Math.max(...points.map(([ x, y ]) => y))
const getLeft = points => Math.min(...points.map(([ x, y ]) => x))
const getRight = points => Math.max(...points.map(([ x, y ]) => x))

// returns a list of points after one timestep
const advance = (points, velocities) =>
  points.map(([ x, y ], i) => [x + velocities[i][0], y + velocities[i][1]])

// returns a list of points one timestep before
const rollback = (points, velocities) =>
  points.map(([ x, y ], i) => [x - velocities[i][0], y - velocities[i][1]])

module.exports = {
  advance,
  getHeight,
  findMessage
}
