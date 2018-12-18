const { test } = require('tap')
const { Field } = require('./lib')

const example1 = `
.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.
`

test('tick', t => {
  const field = new Field(example1)

  field.tick()

  t.same(field.matrix, [
    '.......##.',
    '......|###',
    '.|..|...#.',
    '..|#||...#',
    '..##||.|#|',
    '...#||||..',
    '||...|||..',
    '|||||.||.|',
    '||||||||||',
    '....||..|.'
  ].map(row => row.split('')))

  for (let i = 0; i < 9; i++) field.tick()

  t.same(field.matrix, [
    '.||##.....',
    '||###.....',
    '||##......',
    '|##.....##',
    '|##.....##',
    '|##....##|',
    '||##.####|',
    '||#####|||',
    '||||#|||||',
    '||||||||||'
  ].map(row => row.split('')))

  t.equal(field.resourceValue, 1147)

  t.end()
})
