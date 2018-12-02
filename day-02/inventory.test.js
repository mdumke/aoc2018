const { test } = require('tap')
const { checksum, countMultiples, countChars } = require('./inventory')

test('countChars', g => {
  g.test('handles empty string', t => {
    t.same(countChars(''), {})
    t.end()
  })

  g.test('counts a single letter', t => {
    t.same(countChars('a'), { a: 1 })
    t.end()
  })

  g.test('counts different letters', t => {
    t.same(countChars('abc'), { a: 1, b: 1, c: 1 })
    t.end()
  })

  g.test('counts multiple occurences', t => {
    t.same(countChars('abcba'), { a: 2, b: 2, c: 1 })
    t.end()
  })

  g.test('handles non-astral unicode', t => {
    const str = '\u{1f4a9}\u{1f642}\u{1f4a9}'
    t.same(countChars(str), { '\u{1f4a9}': 2, '\u{1f642}': 1 })
    t.end()
  })

  g.end()
})

test('countMultiples', g => {
  let stateA
  let stateB

  g.beforeEach(done => {
    stateA = { doubles: 0, triplets: 0 }
    stateB = { doubles: 3, triplets: 6 }
    done()
  })

  g.test('handles an empty string', t => {
    const id = ''
    t.same(countMultiples(stateA, id), {
      doubles: 0,
      triplets: 0
    })
    t.end()
  })

  g.test('handles a double letter', t => {
    const id = 'aa'
    t.same(countMultiples(stateA, id), {
      doubles: 1,
      triplets: 0
    })
    t.end()
  })

  g.test('given example 1', t => {
    const id = 'abcdef'
    t.same(countMultiples(stateA, id), {
      doubles: 0,
      triplets: 0
    })
    t.end()
  })

  g.test('given example 2', t => {
    const id = 'bababc'
    t.same(countMultiples(stateA, id), {
      doubles: 1,
      triplets: 1
    })
    t.end()
  })

  g.test('given example 4', t => {
    const id = 'abcccd'
    t.same(countMultiples(stateA, id), {
      doubles: 0,
      triplets: 1
    })
    t.end()
  })

  g.test('given example 5', t => {
    const id = 'aabcdd'
    t.same(countMultiples(stateA, id), {
      doubles: 1,
      triplets: 0
    })
    t.end()
  })

  g.test('given example 7', t => {
    const id = 'ababab'
    t.same(countMultiples(stateA, id), {
      doubles: 0,
      triplets: 1
    })
    t.end()
  })

  g.test('updates a pre-filled state properly', t => {
    const id = 'abababcc'
    t.same(countMultiples(stateB, id), {
      doubles: 4,
      triplets: 7
    })
    t.end()
  })

  g.test('handles a complex example', t => {
    const id = 'xyaabbbbxoasidnvlewaayylasdfoiej'
    t.same(countMultiples(stateB, id), {
      doubles: 4,
      triplets: 7
    })
    t.end()
  })

  g.end()
})

test('checksum', g => {
  g.test('handles simple example', t => {
    const ids = ['xx', 'xx', 'yyy', 'xxyyzzz']
    t.equal(checksum(ids), 3 * 2)
    t.end()
  })

  g.test('handles given example', t => {
    const ids = [
      'abcdef',
      'bababc',
      'abbcde',
      'abcccd',
      'aabcdd',
      'abcdee',
      'ababab'
    ]

    t.equal(checksum(ids), 12)
    t.end()
  })

  g.end()
})
