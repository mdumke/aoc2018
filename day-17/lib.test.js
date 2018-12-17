const { test } = require('tap')
const { parseInput, Field } = require('./lib')

const scan = `
x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504
`

test('Field.buildMatrix', t => {
  const field = new Field(...parseInput(scan))

  t.same(field.matrix, [
    '......+.......',
    '............#.',
    '.#..#.......#.',
    '.#..#..#......',
    '.#..#..#......',
    '.#.....#......',
    '.#.....#......',
    '.#######......',
    '..............',
    '..............',
    '....#.....#...',
    '....#.....#...',
    '....#.....#...',
    '....#######...'
  ].map(row => row.split('')))
  t.end()
})

test('Field.fill', g => {
  g.test('reservoir with middle block', t => {
    const xs = [[0, 2, 5], [4, 2, 5]]
    const ys = [[5, 0, 4], [2, 2, 2]]

    const field = new Field(xs, ys, 498)
    field.fill()

    t.same(field.matrix, [
      '...|...',
      '|||||||',
      '|#~#~#|',
      '|#~~~#|',
      '|#~~~#|',
      '|#####|'
    ].map(row => row.split('')))
    t.end()
  })

  g.test('reservoir with deeper middle block', t => {
    const xs = [[0, 2, 5], [4, 2, 5]]
    const ys = [[5, 0, 4], [3, 2, 2]]

    const field = new Field(xs, ys, 498)
    field.fill()

    t.same(field.matrix, [
      '...|...',
      '|||||||',
      '|#~~~#|',
      '|#~#~#|',
      '|#~~~#|',
      '|#####|'
    ].map(row => row.split('')))
    t.end()
  })

  g.test('given example', t => {
    const field = new Field(...parseInput(scan))
    field.fill()
    t.same(field.matrix, [
      '......|.......',
      '......|.....#.',
      '.#..#||||...#.',
      '.#..#~~#|.....',
      '.#..#~~#|.....',
      '.#~~~~~#|.....',
      '.#~~~~~#|.....',
      '.#######|.....',
      '........|.....',
      '...|||||||||..',
      '...|#~~~~~#|..',
      '...|#~~~~~#|..',
      '...|#~~~~~#|..',
      '...|#######|..'
    ].map(row => row.split('')))
    t.end()
  })

  g.end()
})
