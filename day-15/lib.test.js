const { test } = require('tap')
const { Board } = require('./lib')
const { sum } = require('../utils')

const field1 = `
#######
#.E...#
#.....#
#...G.#
#######
`

const field2 = `
#########
#G..G..G#
#.......#
#.......#
#G..E..G#
#.......#
#.......#
#G..G..G#
#########
`

const field3 = `
#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######
`

const field4 = `
#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######
`

const field5 = `
#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######
`

const field6 = `
#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######
`

const field7 = `
#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######
`

const field8 = `
#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########
`

test('move unit', t => {
  const board = new Board(field1)

  board.move(board.units[0])
  t.equal(board.units[0].x, 1)
  t.equal(board.units[0].y, 3)

  board.move(board.units[1])
  t.equal(board.units[1].x, 2)
  t.equal(board.units[1].y, 4)

  board.move(board.units[0])
  board.move(board.units[1])
  board.move(board.units[0])

  t.equal(board.units[0].x, 1)
  t.equal(board.units[0].y, 4)
  t.equal(board.units[1].x, 2)
  t.equal(board.units[1].y, 4)

  t.end()
})

test('moving example 2', t => {
  const board = new Board(field2)

  board.units.forEach(unit => board.move(unit))
  board.units.forEach(unit => board.move(unit))
  board.units.forEach(unit => board.move(unit))

  t.same(board.units.map(u => [u.x, u.y]), [
    [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 3, 3 ], [ 3, 4 ],
    [ 3, 5 ], [ 4, 1 ], [ 4, 4 ], [ 5, 7 ]
  ])

  t.end()
})

test('sort units', t => {
  const board = new Board(field2)
  const expected = [...board.units.map(u => [u.x, u.y])]

  board.units = [null, ...board.units, null].reverse()
  board.sortUnits()

  t.same(board.units.map(u => [u.x, u.y]), expected)
  t.end()
})

test('attack', g => {
  g.test('2 rounds', t => {
    const board = new Board(field3)

    for (let round = 0; round < 2; round++) {
      board.sortUnits()

      for (let i = 0; i < board.units.length; i++) {
        board.move(board.units[i])
        board.attack(board.units[i])
      }
    }

    board.sortUnits()

    t.same(board.units.map(u => u.hp), [200, 200, 188, 194, 194, 194])
    t.end()
  })

  g.test('23 rounds', t => {
    const board = new Board(field3)

    for (let round = 0; round < 23; round++) {
      board.sortUnits()

      for (let i = 0; i < board.units.length; i++) {
        board.move(board.units[i])
        board.attack(board.units[i])
      }
    }

    board.sortUnits()

    t.same(board.units.filter(Boolean).map(u => u.hp), [200, 200, 131, 131, 131])
    t.end()
  })

  g.test('28 rounds', t => {
    const board = new Board(field3)
    for (let round = 0; round < 28; round++) {
      board.sortUnits()

      for (let i = 0; i < board.units.length; i++) {
        board.move(board.units[i])
        board.attack(board.units[i])
      }
    }

    board.sortUnits()

    t.same(board.units.filter(Boolean).map(u => u.hp), [200, 131, 116, 113, 200])
    t.end()
  })

  g.test('47 rounds', t => {
    const board = new Board(field3)
    for (let round = 0; round < 46; round++) {
      board.sortUnits()

      for (let i = 0; i < board.units.length; i++) {
        board.move(board.units[i])
        board.attack(board.units[i])
      }
    }

    t.notOk(board.isFinished())

    board.sortUnits()

    for (let i = 0; i < board.units.length; i++) {
      board.move(board.units[i])
      board.attack(board.units[i])
    }

    t.ok(board.isFinished())

    t.same(board.units.filter(Boolean).map(u => u.hp), [200, 131, 59, 200])
    t.end()
  })

  g.end()
})

test('given examples', g => {
  const simulateBattle = board => {
    let round = 0

    while (++round) {
      board.sortUnits()

      for (let i = 0; i < board.units.length; i++) {
        if (board.isFinished()) return round
        if (board.units[i] === null) continue

        board.move(board.units[i])
        board.attack(board.units[i])
      }
    }
  }

  g.test('example 1', t => {
    const board = new Board(field3)

    const fullRounds = simulateBattle(board) - 1
    const hps = board.units.map(u => u.hp).reduce(sum)

    t.equal(fullRounds * hps, 27730)
    t.end()
  })

  g.test('example 2', t => {
    const board = new Board(field4)

    const fullRounds = simulateBattle(board) - 1
    const hps = board.units.filter(Boolean).map(u => u.hp).reduce(sum)

    t.equal(fullRounds * hps, 36334)
    t.end()
  })

  g.test('example 3', t => {
    const board = new Board(field5)

    const fullRounds = simulateBattle(board) - 1
    const hps = board.units.filter(Boolean).map(u => u.hp).reduce(sum)

    t.equal(fullRounds * hps, 39514)
    t.end()
  })

  g.test('example 4', t => {
    const board = new Board(field6)

    const fullRounds = simulateBattle(board) - 1
    const hps = board.units.filter(Boolean).map(u => u.hp).reduce(sum)

    t.equal(fullRounds * hps, 27755)
    t.end()
  })

  g.test('example 5', t => {
    const board = new Board(field7)

    const fullRounds = simulateBattle(board) - 1
    const hps = board.units.filter(Boolean).map(u => u.hp).reduce(sum)

    t.equal(fullRounds * hps, 28944)
    t.end()
  })

  g.test('example 6', t => {
    const board = new Board(field8)

    const fullRounds = simulateBattle(board) - 1
    const hps = board.units.filter(Boolean).map(u => u.hp).reduce(sum)

    t.equal(fullRounds * hps, 18740)
    t.end()
  })

  g.end()
})
