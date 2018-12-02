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
  const multiples = uniqueValues(countChars(id))

  return {
    doubles: (state.doubles || 0) + multiples.has(2),
    triplets: (state.triplets || 0) + multiples.has(3)
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

// returns only the values of the given object as a set
const uniqueValues = obj => new Set(Object.keys(obj).map(k => obj[k]))

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
