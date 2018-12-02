/*
 * utilities and functions for computing checksum
 *
 */

const fs = require('fs')

// computes the checksum for the given id list
const checksum = ids => {
  const { doubles, triplets } = ids.reduce(countMultiples, {})
  return doubles * triplets
}

// updates the state if letters appear exactly two or three times
const countMultiples = (state, id) => {
  const charCounts = countChars(id)

  let hasDoubles = false
  let hasTriplets = false

  for (let char in charCounts) {
    if (charCounts[char] === 2) hasDoubles = true
    if (charCounts[char] === 3) hasTriplets = true
  }

  return {
    doubles: (state.doubles || 0) + hasDoubles,
    triplets: (state.triplets || 0) + hasTriplets
  }
}

// counts the number of occurences of each character
const countChars = str => {
  const counts = {}

  for (let char of str) {
    counts[char] = (counts[char] || 0) + 1
  }

  return counts
}

// reads inputs from the file
const getBoxIds = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data.split('\n').filter(Boolean))
  })
}

module.exports = {
  checksum,
  countMultiples,
  countChars,
  getBoxIds
}
