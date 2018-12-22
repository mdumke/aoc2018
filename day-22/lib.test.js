const { test } = require('tap')
const { getErosionLevels, findTarget, computeRisk, buildCave } = require('./lib')

test('build area', t => {
  const depth = 510
  const target = { col: 10, row: 10 }

  t.equal(computeRisk(getErosionLevels(target, 10, 10, depth)), 114)
  t.end()
})

test('part 1', t => {
  const depth = 11739
  const target = { col: 11, row: 718 }

  t.equal(
    computeRisk(getErosionLevels(target, target.col, target.row, depth)),
    8735
  )
  t.end()
})

test('build larger area', t => {
  const correct = [
    '.=.|=.|.|=.|=|=.',
    '.|=|=|||..|.=...',
    '.==|....||=..|==',
    '=.|....|.==.|==.',
    '=|..==...=.|==..',
    '=||.=.=||=|=..|=',
    '|.=.===|||..=..|',
    '|..==||=.|==|===',
    '.=..===..=|.|||.',
    '.======|||=|=.|=',
    '.===|=|===.===||',
    '=|||...|==..|=.|',
    '=.=|=.=..=.||==|',
    '||=|=...|==.=|==',
    '|=.=||===.|||===',
    '||.|==.|.|.||=||'
  ].map(r => r.split(''))

  const depth = 510
  const target = { col: 10, row: 10 }
  const cave = buildCave(target, 15, 15, depth)

  t.same(cave, correct)
  t.end()
})

test('find target example', t => {
  const depth = 510
  const target = { row: 10, col: 10 }
  const cave = buildCave(target, 40, 40, depth)

  t.equal(findTarget(cave, target), 45)
  t.end()
})
