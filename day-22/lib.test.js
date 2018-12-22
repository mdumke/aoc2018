const { test } = require('tap')
const { getErosionLevels, computeRisk } = require('./lib')

test('build area', t => {
  const depth = 510
  const target = { col: 10, row: 10 }

  t.equal(computeRisk(getErosionLevels(target, depth)), 114)
  t.end()
})
