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

module.exports = {
  ascending, countByValue, max, min, sum
}
