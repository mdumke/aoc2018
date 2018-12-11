const { test } = require('tap')
const { getFuelGrid, findLargestPatchOfAnySize } = require('./lib')

test('given example 1', t => {
  const grid = getFuelGrid(18)
  t.same(findLargestPatchOfAnySize(grid), [90, 269, 16])
  t.end()
})

test('given example 2', t => {
  const grid = getFuelGrid(42)
  t.same(findLargestPatchOfAnySize(grid), [232, 251, 12])
  t.end()
})
