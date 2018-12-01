/*
 * functions to help with calibration
 *
 */

const fs = require('fs')

const getInputValues = cb => {
  fs.readFile('input.txt', 'utf8', (_, lines) => {
    cb(lines.split('\n').filter(Boolean).map(Number))
  })
}

// returns the sum of given numerical values
const sumValues = values => values.reduce((memo, v) => memo + v, 0)

// returns the first frequency encountered twice
const findRepeatedFrequency = changes => {
  const frequencies = cumulativeSum(changes)
  const seen = new Set()

  for (let f of frequencies) {
    if (seen.has(f)) return f
    seen.add(f)
  }
}

// iterates forever through the running total of the given values
function * cumulativeSum (values) {
  let current = 0

  while (true) {
    for (let val of values) {
      yield current
      current += val
    }
  }
}

// export for testing
module.exports = {
  findRepeatedFrequency,
  getInputValues,
  sumValues
}
