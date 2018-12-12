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
  g.test('.', t => {
    t.same(step('.', 0, rules), ['.', 0])
    t.end()
  })

  g.test('#', t => {
    t.same(step('#', 0, rules), ['##', 0])
    t.end()
  })

  g.test('##', t => {
    t.same(step('##', 0, rules), ['#.#', -1])
    t.end()
  })

  g.test('## with offset', t => {
    t.same(step('##', -5, rules), ['#.#', -6])
    t.end()
  })

  g.test('stationary', t => {
    t.same(step('#.#', 0, rules), ['#.#', 1])
    t.end()
  })

  g.test('given example 1', t => {
    t.same(
      step('#..#.#..##......###...###', 0, rules),
      ['#...#....#.....#..#..#..#', 0])
    t.end()
  })

  g.test('given example 5', t => {
    t.same(
      step('#...##...#.#..#..#...#...#', 1, rules),
      ['##.#.#....#...#..##..##..##', 1])
    t.end()
  })

  g.end()
})

test('evolve', g => {
  g.test('given example 1', t => {
    t.same(
      evolve('#..#.#..##......###...###', 1, rules),
      ['#...#....#.....#..#..#..#', 0]
    )
    t.end()
  })

  g.test('given example 2', t => {
    t.same(
      evolve('#..#.#..##......###...###', 3, rules),
      ['#.#...#..#.#....#..#..#...#', -1]
    )
    t.end()
  })

  g.test('given example 20', t => {
    t.same(
      evolve('#..#.#..##......###...###', 20, rules),
      ['#....##....#####...#######....#.#..##', -2]
    )
    t.end()
  })

  g.test('stationary', t => {
    t.same(evolve('#.#', 3, rules), ['#.#', 3])
    t.end()
  })

  g.end()
})

test('evaluate', g => {
  g.test('given example 1', t => {
    t.equal(evaluate('#...#....#.....#..#..#..#', 0), 91)
    t.end()
  })

  g.test('given example 2', t => {
    const [ state, offset ] = evolve(init, 20, rules)

    t.equal(evaluate(state, offset), 325)
    t.end()
  })

  g.end()
})
