const { test } = require('tap')
const {
  buildSleepMap,
  findMostAsleepGuard,
  findSleepiestMinute
} = require('./repose')

test('buildSleepMap', g => {
  g.test('single guard, no sleep', t => {
    const records = [[new Date(1518, 2, 20, 0, 2), { guard: 1 }]]

    t.same(buildSleepMap(records), { 1: [] })
    t.end()
  })

  g.test('single guard, one sleep phase', t => {
    const records = [
      [new Date(1518, 2, 20, 0, 3), { guard: 1 }],
      [new Date(1518, 2, 20, 0, 11), { sleep: true }],
      [new Date(1518, 2, 20, 0, 15), { wake: true }]
    ]

    t.same(buildSleepMap(records), { 1: [[11, 15]] })
    t.end()
  })

  g.test('single guard, multiple sleep phases', t => {
    const records = [
      [new Date(1518, 2, 20, 0, 3), { guard: 1 }],
      [new Date(1518, 2, 20, 0, 11), { sleep: true }],
      [new Date(1518, 2, 20, 0, 15), { wake: true }],
      [new Date(1518, 2, 20, 0, 25), { sleep: true }],
      [new Date(1518, 2, 20, 0, 27), { wake: true }],
      [new Date(1518, 2, 20, 0, 38), { sleep: true }],
      [new Date(1518, 2, 20, 0, 42), { wake: true }]
    ]

    t.same(buildSleepMap(records), { 1: [[11, 15], [25, 27], [38, 42]] })
    t.end()
  })

  g.test('two guards, no sleep', t => {
    const records = [
      [new Date(1518, 2, 20, 0, 3), { guard: 2 }],
      [new Date(1518, 2, 21, 0, 4), { guard: 3 }]
    ]

    t.same(buildSleepMap(records), { 2: [], 3: [] })
    t.end()
  })

  g.test('two guards, same starting day', t => {
    const records = [
      [new Date(1518, 3, 20, 0, 3), { guard: 2 }],
      [new Date(1518, 3, 20, 0, 10), { sleep: true }],
      [new Date(1518, 3, 20, 0, 20), { wake: true }],
      [new Date(1518, 3, 20, 23, 58), { guard: 3 }],
      [new Date(1518, 3, 20, 0, 11), { sleep: true }],
      [new Date(1518, 3, 20, 0, 21), { wake: true }]
    ]

    t.same(buildSleepMap(records), { 2: [[10, 20]], 3: [[11, 21]] })
    t.end()
  })

  g.test('given example', t => {
    const records = [
      [new Date(1518, 11, 1, 0, 0), { guard: 10 }],
      [new Date(1518, 11, 1, 0, 5), { sleep: true }],
      [new Date(1518, 11, 1, 0, 25), { wake: true }],
      [new Date(1518, 11, 1, 0, 30), { sleep: true }],
      [new Date(1518, 11, 1, 0, 55), { wake: true }],

      [new Date(1518, 11, 1, 23, 58), { guard: 99 }],
      [new Date(1518, 11, 2, 0, 40), { sleep: true }],
      [new Date(1518, 11, 2, 0, 50), { wake: true }],

      [new Date(1518, 11, 3, 0, 5), { guard: 10 }],
      [new Date(1518, 11, 3, 0, 24), { sleep: true }],
      [new Date(1518, 11, 3, 0, 29), { wake: true }],

      [new Date(1518, 11, 4, 0, 2), { guard: 99 }],
      [new Date(1518, 11, 4, 0, 36), { sleep: true }],
      [new Date(1518, 11, 4, 0, 46), { wake: true }],

      [new Date(1518, 11, 5, 0, 3), { guard: 99 }],
      [new Date(1518, 11, 5, 0, 45), { sleep: true }],
      [new Date(1518, 11, 5, 0, 55), { wake: true }]
    ]

    t.same(buildSleepMap(records), {
      10: [[5, 25], [30, 55], [24, 29]],
      99: [[40, 50], [36, 46], [45, 55]] })
    t.end()
  })

  g.end()
})

test('findMostAsleepGuard', g => {
  g.test('single empty entry', t => {
    const lookup = { 1: [] }

    t.same(findMostAsleepGuard(lookup), {
      guard: 1,
      total: 0
    })
    t.end()
  })

  g.test('single entry', t => {
    const lookup = { 1: [[1, 2]] }

    t.same(findMostAsleepGuard(lookup), {
      guard: 1,
      total: 1
    })
    t.end()
  })

  g.test('two entries, one empty', t => {
    const lookup = {
      1: [],
      2: [[10, 20]]
    }

    t.same(findMostAsleepGuard(lookup), {
      guard: 2,
      total: 10
    })
    t.end()
  })

  g.test('multiple guards', t => {
    const lookup = {
      5: [[27, 37], [38, 48]],
      8: [[10, 20]],
      3: [],
      7: [[10, 30], [47, 59]],
      1: [[5, 10]]
    }

    t.same(findMostAsleepGuard(lookup), {
      guard: 7,
      total: 32
    })
    t.end()
  })

  g.test('given example', t => {
    const lookup = {
      10: [[5, 25], [30, 55], [24, 29]],
      99: [[40, 50], [36, 46], [45, 55]]
    }

    t.same(findMostAsleepGuard(lookup), {
      guard: 10,
      total: 50
    })
    t.end()
  })

  g.end()
})

test('findSleepiestMinute', g => {
  test('one-minute interval', t => {
    t.equal(findSleepiestMinute([[0, 1]]).value, 0)
    t.end()
  })

  test('one longer interval', t => {
    t.equal(findSleepiestMinute([[10, 20]]).value, 10)
    t.end()
  })

  test('two intervals without overlap', t => {
    t.equal(findSleepiestMinute([[15, 20], [40, 50]]).value, 15)
    t.end()
  })

  test('two adjacent intervals', t => {
    t.equal(findSleepiestMinute([[1, 2], [2, 3]]).value, 1)
    t.end()
  })

  test('two overlapping intervals', t => {
    t.equal(findSleepiestMinute([[10, 21], [20, 30]]).value, 20)
    t.end()
  })

  test('multiple overlapping intervals', t => {
    const intervals = [
      [5, 20], [10, 30], [20, 35], [29, 45], [40, 50], [44, 55]
    ]

    t.equal(findSleepiestMinute(intervals).value, 29)
    t.equal(findSleepiestMinute(intervals).count, 3)
    t.end()
  })

  test('given example', t => {
    t.equal(findSleepiestMinute([
      [5, 25], [30, 55], [24, 29]
    ]).value, 24)
    t.end()
  })

  g.end()
})
