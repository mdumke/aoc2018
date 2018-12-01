const { test } = require('tap')
const { findRepeatedFrequency } = require('./calibrate')

test('findRepeatedFrequency', g => {
  g.test('handles sequence 1, -1', t => {
    t.equal(findRepeatedFrequency([1, -1]), 0)
    t.end()
  })

  g.test('sequence 1, 1, -1', t => {
    t.equal(findRepeatedFrequency([1, 1, -1]), 1)
    t.end()
  })

  g.test('sequence 1, 1, 1, 1, -3', t => {
    t.equal(findRepeatedFrequency([1, 1, 1, 1, 1, -3]), 2)
    t.end()
  })

  g.test('correctly handles a change of 0', t => {
    t.equal(findRepeatedFrequency([1, 0, 1]), 1)
    t.end()
  })

  g.test('handles the second example given', t => {
    t.equal(findRepeatedFrequency([3, 3, 4, -2, -4]), 10)
    t.end()
  })

  g.test('handles the third example given', t => {
    t.equal(findRepeatedFrequency([-6, 3, 8, 5, -6]), 5)
    t.end()
  })

  g.test('handles the fourth example given', t => {
    t.equal(findRepeatedFrequency([7, 7, -2, -7, -4]), 14)
    t.end()
  })

  g.test('handles the main example given', t => {
    t.equal(findRepeatedFrequency([1, -2, 3, 1]), 2)
    t.end()
  })

  g.end()
})
