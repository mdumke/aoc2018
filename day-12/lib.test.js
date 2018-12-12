const { test } = require('tap')
const { evaluate, evolve, step } = require('./lib')

// given example data
const init = '#..#.#..##......###...###'
const rules = {
  '...##': true,
  '..#..': true,
  '.#...': true,
  '.#.#.': true,
  '.#.##': true,
  '.##..': true,
  '.####': true,
  '#.#.#': true,
  '#.###': true,
  '##.#.': true,
  '##.##': true,
  '###..': true,
  '###.#': true,
  '####.': true
}

test('step', g => {
  g.test('.....', t => {
    t.same(step('.....', rules), '.....')
    t.end()
  })

  g.test('..#..', t => {
    t.same(step('..#..', rules), '..#..')
    t.end()
  })

  g.test('..##..', t => {
    t.same(step('..##..', rules), '...#..')
    t.end()
  })

  g.test('given example 1', t => {
    t.same(
      step('...#..#.#..##......###...###...........', rules),
      '...#...#....#.....#..#..#..#...........')
    t.end()
  })

  g.test('given example 5', t => {
    t.same(
      step('....#...##...#.#..#..#...#...#.........', rules),
      '....##.#.#....#...#..##..##..##........')
    t.end()
  })

  g.end()
})

test('evolve', g => {
  g.test('given example 1', t => {
    t.same(
      evolve('#..#.#..##......###...###', 1, rules),
      ['..#...#....#.....#..#..#..#..', 2]
    )
    t.end()
  })

  g.test('given example 2', t => {
    t.same(
      evolve('#..#.#..##......###...###', 2, rules),
      ['....##..##...##....#..#..#..##...', 4]
    )
    t.end()
  })

  g.test('given example 4', t => {
    t.same(
      evolve('#..#.#..##......###...###', 4, rules),
      ['........#.#..#...#.#...#..#..##..##......', 8]
    )
    t.end()
  })

  g.end()
})

test('evaluate', g => {
  g.test('given example 1', t => {
    t.equal(evaluate('....#...#....#.....#..#..#..#....', 4), 91)
    t.end()
  })

  g.test('given example 2', t => {
    const [ state, pad ] = evolve(init, 20, rules)

    t.equal(evaluate(state, pad), 325)
    t.end()
  })

  g.end()
})
