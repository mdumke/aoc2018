/*
 * checksum and distance functions and utilities
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

// returns an array of pairs that differ in exactly one char
// ASSUMES: ids have equal length and only BMP unicode
const findClosePairs = ids => {
  const closePairs = []

  for (let i = 0; i < ids.length - 1; i++) {
    for (let k = i + 1; k < ids.length; k++) {
      if (computeDistance(ids[i], ids[k]) === 1) {
        closePairs.push([ids[i], ids[k]])
      }
    }
  }

  return closePairs
}

// returns the number of differing chars between both strings
// ASSUMES: equal length and only BMP unicode
const computeDistance = (s1, s2) => {
  let distance = 0

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) distance++
  }

  return distance
}

// returns a new string with common chars of s1 and s2
// ASSUMES: equal length and only BMP unicode
const commonChars = (s1, s2) => {
  let result = ''

  for (let i = 0; i < s1.length; i++) {
    result += s1[i] === s2[i] ? s1[i] : ''
  }

  return result
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
  commonChars,
  computeDistance,
  countMultiples,
  countChars,
  findClosePairs,
  getBoxIds
}
