const { test } = require('tap')
const Cube = require('./cube')

test('Cube.split', g => {
  g.test('splits correctly once', t => {
    const cube = new Cube([1, 0, 0], 4)
    const children = cube.split()

    t.equal(children.length, 8)
    t.end()
  })

  g.test('splits correctly twice', t => {
    const cube = new Cube([0, 0, 0], 4)

    let children = cube.split()
    children = children.reduce((acc, cube) => [...acc, ...cube.split()], [])

    t.equal(children[64 - 1].range, 1)
    t.equal(children.length, 64)
    t.end()
  })

  g.end()
})

test('Cube.countBotsInRange', t => {
  const cube = new Cube([2, 2, 2], 2)
  const bots = [
    { x: -1, y: -1, z: -1, range: 3},
    { x: 2, y: 2, z: 6, range: 3},
    { x: 2, y: 2, z: 6, range: 1},
  ]

  t.equal(cube.countBotsInRange(bots), 2)
  t.end()
})

test('Cube.isInRange', t => {
  const cube = new Cube([0, 0, 0], 3)

  t.ok(cube.isInRange({ x: 0, y: 0, z: 0, range: 1 }))
  t.ok(cube.isInRange({ x: 4, y: 0, z: 0, range: 1 }))
  t.ok(cube.isInRange({ x: -4, y: 0, z: 0, range: 1 }))
  t.ok(cube.isInRange({ x: 0, y: -4, z: 0, range: 1 }))
  t.notOk(cube.isInRange({ x: 5, y: 0, z: 0, range: 1 }))
  t.notOk(cube.isInRange({ x: 0, y: 0, z: -5, range: 1 }))
  t.notOk(cube.isInRange({ x: 4, y: 4, z: 4, range: 1 }))
  t.ok(cube.isInRange({ x: 4, y: 4, z: 4, range: 3 }))
  t.ok(cube.isInRange({ x: 5, y: 4, z: 3, range: 3 }))

  t.end()
})
