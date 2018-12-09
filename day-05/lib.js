/*
 * computing polymer reactions
 *
 */

const fs = require('fs')

// returns reacted polymer after removing best unit type
const computeOptimizedReaction = polymer => {
  let winner = polymer
  let candidate

  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(ignoreType => {
    candidate = computeReaction(polymer, ignoreType)
    winner = candidate.length < winner.length
      ? candidate
      : winner
  })

  return winner
}

// returns the polymer after removing matching unit-pairs
// ASSUMES: ignoreType is lowercase
const computeReaction = (polymer, ignoreType = null) => {
  let result = []
  let lastUnit

  for (let unit of polymer) {
    if (unit.toLowerCase() === ignoreType) continue

    isMatch(lastUnit, unit)
      ? result.pop()
      : result.push(unit)

    lastUnit = result[result.length - 1]
  }

  return result.join('')
}

// returns true if c1 and c2 are the same char in different cases
const isMatch = (c1, c2) =>
  c1 && c2 && Math.abs(c1.charCodeAt(0) - c2.charCodeAt(0)) === 32

// reads the polymer data from input.txt
const getPolymer = cb =>
  fs.readFile('input.txt', 'utf8', (_, data) => cb(data.trim()))

module.exports = {
  computeOptimizedReaction,
  computeReaction,
  getPolymer
}
