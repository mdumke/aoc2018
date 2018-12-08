/*
 * general purpose utilities useful for multiple problems
 *
 */

// reducer helper functions
const sum = (memo, value) => memo + value

const countByValue = (lookup, v) => {
  lookup[v] = (lookup[v] || 0) + 1
  return lookup
}

module.exports = {
  countByValue,
  sum
}
