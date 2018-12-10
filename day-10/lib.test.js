const { test } = require('tap')
const { advance, getHeight, findMessage } = require('./lib')

const points = [
  [9, 1], [7, 0], [3, -2], [6, 10], [2, -4], [-6, 10], [1, 8], [1, 7],
  [-3, 11], [7, 6], [-2, 3], [-4, 3], [10, -3], [5, 11], [4, 7], [8, -2],
  [15, 0], [1, 6], [8, 9], [3, 3], [0, 5], [-2, 2], [5, -2], [1, 4],
  [-2, 7], [3, 6], [5, 0], [-6, 0], [5, 9], [14, 7], [-3, 6]
]

const velocities = [
  [0, 2], [-1, 0], [-1, 1], [-2, -1], [2, 2], [2, -2], [1, -1], [1, 0],
  [1, -2], [-1, -1], [1, 0], [2, 0], [-1, 1], [1, -2], [0, -1], [0, 1],
  [-2, 0], [1, 0], [0, -1], [-1, 1], [0, -1], [2, 0], [1, 2], [2, 1],
  [2, -2], [-1, -1], [1, 0], [2, 0], [1, -2], [-2, 0], [2, -1]
]

test('findMessage finds message after 3 steps', t => {
  let p = points
  t.notOk(getHeight(p) === 7)

  p = advance(p, velocities)
  t.notOk(getHeight(p) === 7)

  p = advance(p, velocities)
  t.notOk(getHeight(p) === 7)

  p = advance(p, velocities)
  t.ok(getHeight(p) === 7)

  t.equal(findMessage(points, velocities).seconds, 3)

  t.end()
})
