const { test } = require('tap')
const { sumPatch } = require('./lib')

test('sumPatch', g => {
  g.test('given example 1', t => {
    t.equal(sumPatch(33, 45, 18), 29)
    t.end()
  })

  g.test('given example 2', t => {
    t.equal(sumPatch(21, 61, 42), 30)
    t.end()
  })

  g.end()
})
