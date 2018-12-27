const { test } = require('tap')
const {
  findOverlap,
  findOverlaps,
  parseLine,
  reduceDuplicates,
  reformat
} = require('./lib')

const { min, max } = require('../utils')

test('findOverlap', g => {
  g.test('two cubes', t => {
    const regions = [
      { x: 0, y: 0, z: 0, wx: 4, wy: 1, wz: 3 },
      { x: 3, y: 0, z: 0, wx: 2, wy: 2, wz: 2 }
    ]

    t.same(findOverlap(...regions), { x: 3, y: 0, z: 0, wx: 1, wy: 1, wz: 2 })
    t.end()
  })

  g.end()
})

test('findOverlaps', g => {
  g.test('two cubes', t => {
    const regions = [
      { x: 0, y: 0, z: 0, wx: 2, wy: 2, wz: 2 },
      { x: 1, y: 0, z: 0, wx: 2, wy: 2, wz: 2 },
      { x: 2, y: 0, z: 0, wx: 2, wy: 2, wz: 2 }
    ]

    t.same(findOverlaps(regions), [
      { x: 1, y: 0, z: 0, wx: 1, wy: 2, wz: 2 },
      { x: 2, y: 0, z: 0, wx: 1, wy: 2, wz: 2 },
    ])
    t.end()
  })

  g.end()
})

test('reduceDuplicates', g => {
  g.test('identical regions', t => {
    const regions = [
      { x: 0, y: 0, z: 0, wx: 2, wy: 2, wz: 2 },
      { x: 0, y: 0, z: 0, wx: 2, wy: 2, wz: 2 },
      { x: 1, y: 0, z: 0, wx: 2, wy: 2, wz: 2 }
    ]

    t.equal(reduceDuplicates(regions).length, 2)
    t.end()
  })

  g.end()
})

test('given example', t => {
  const regions = [
    'pos=<0,0,0>, r=4',
    'pos=<1,0,0>, r=1',
    'pos=<4,0,0>, r=3',
    'pos=<0,2,0>, r=1',
    'pos=<0,5,0>, r=3',
    'pos=<0,0,3>, r=1',
    'pos=<1,1,1>, r=1',
    'pos=<1,1,2>, r=1',
    'pos=<1,3,1>, r=1'
  ].map(parseLine).map(reformat)

  let overlaps, reduced

  overlaps = findOverlaps(regions)
  reduced = reduceDuplicates(overlaps)

  console.log(reduced)
  console.log(reduced.map(({ x }) => x).reduce(min))
  console.log(reduced.map(({ x, wx }) => x + wx).reduce(max))

  t.end()
})
