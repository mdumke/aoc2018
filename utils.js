/*
 * general purpose utilities useful for multiple problems
 *
 */

// sort helper function
const ascending = (x, y) => x - y

// reducer helper functions
const sum = (memo, value) => memo + value
const max = (max, value) => Math.max(max, value)
const min = (min, value) => Math.min(min, value)

const countByValue = (lookup, v) => {
  lookup[v] = (lookup[v] || 0) + 1
  return lookup
}

const manhattan = (p1, p2 = { x: 0, y: 0, z: 0 }) =>
  Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) + Math.abs(p1.z - p2.z)

module.exports = {
  ascending, countByValue, max, min, sum, manhattan
}
