/*
 * computing polymer reactions
 *
 */

const fs = require('fs')

// returns the polymer after removing matching pairs
const computeReaction = polymer => {
  let result = []
  let lastChar

  for (let char of polymer) {
    lastChar = result[result.length - 1]

    if (lastChar && isMatch(lastChar, char)) {
      result.pop()
    } else {
      result.push(char)
    }
  }

  return result.join('')
}

// returns true if c1 and c2 are the same char in different cases
const isMatch = (c1, c2) => {
  return Math.abs(c1.charCodeAt(0) - c2.charCodeAt(0)) === 32
}

// reads the polymer data from input.txt
const getPolymer = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data.trim())
  })
}

module.exports = {
  computeReaction,
  getPolymer,
  isMatch
}
