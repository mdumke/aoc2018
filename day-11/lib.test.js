const { test } = require('tap')
const { findLargestPatchOfAnySize } = require('./lib')

test('given example 1', t => {
  t.same(findLargestPatchOfAnySize(18), [90, 269, 16])
  t.end()
})

test('given example 2', t => {
  t.same(findLargestPatchOfAnySize(42), [232, 251, 12])
  t.end()
})
