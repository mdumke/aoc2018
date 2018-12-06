const { test } = require('tap')
const {
  findBoundary,
  getAreas,
  getBoundaryPoints,
  findClosestPoints,
  findLargestFiniteArea,
  findSafeRegion
} = require('./lib')

test('findBoundary', g => {
  g.test('single point', t => {
    const coords = [{ top: 0, left: 1 }]

    t.same(findBoundary(coords), {
      top: 0, left: 1, width: 1, height: 1
    })
    t.end()
  })

  g.test('two points in a row', t => {
    const coords = [
      { top: 1, left: 0 },
      { top: 1, left: 1 }
    ]

    t.same(findBoundary(coords), {
      top: 1, left: 0, width: 2, height: 1
    })
    t.end()
  })

  g.test('three points in a row', t => {
    const coords = [
      { top: 2, left: 5 },
      { top: 2, left: 1 },
      { top: 2, left: 2 }
    ]

    t.same(findBoundary(coords), {
      top: 2, left: 1, width: 5, height: 1
    })
    t.end()
  })

  g.test('sort order does not matter', t => {
    const coords = [
      { top: 1, left: 1 },
      { top: 2, left: 1 },
      { top: 11, left: 1 }
    ]

    t.same(findBoundary(coords), {
      top: 1, left: 1, width: 1, height: 11
    })
    t.end()
  })

  g.test('two points in a column', t => {
    const coords = [
      { top: 1, left: 2 },
      { top: 4, left: 2 }
    ]

    t.same(findBoundary(coords), {
      top: 1, left: 2, width: 1, height: 4
    })
    t.end()
  })

  g.test('triangle', t => {
    const coords = [
      { top: 0, left: 2 },
      { top: 1, left: 3 },
      { top: 2, left: 0 }
    ]

    t.same(findBoundary(coords), {
      top: 0, left: 0, width: 4, height: 3
    })
    t.end()
  })

  g.test('given example', t => {
    const coords = [
      { left: 1, top: 1 },
      { left: 1, top: 6 },
      { left: 8, top: 3 },
      { left: 3, top: 4 },
      { left: 5, top: 5 },
      { left: 8, top: 9 }
    ]

    t.same(findBoundary(coords), {
      top: 1, left: 1, width: 8, height: 9
    })
    t.end()
  })

  g.end()
})

test('findClosestPoints', g => {
  g.test('single point', t => {
    const coords = [{ left: 0, top: 0 }]
    const boundary = { top: 0, left: 0, width: 1, height: 1 }

    t.same(findClosestPoints(coords, boundary), [[{ id: 0, dist: 0 }]])
    t.end()
  })

  g.test('two points in a row', t => {
    const coords = [
      { left: 1, top: 1 },
      { left: 3, top: 1 }
    ]
    const boundary = { top: 1, left: 1, width: 3, height: 1 }

    t.same(findClosestPoints(coords, boundary), [[
      { id: 0, dist: 0 },
      { id: null, dist: 1 },
      { id: 1, dist: 0 }
    ]])
    t.end()
  })

  g.test('multiple points in a row', t => {
    const coords = [
      { left: 2, top: 2 },
      { left: 3, top: 2 },
      { left: 7, top: 2 },
      { left: 9, top: 2 }
    ]
    const boundary = { top: 2, left: 2, width: 8, height: 1 }

    t.same(findClosestPoints(coords, boundary), [[
      { id: 0, dist: 0 },
      { id: 1, dist: 0 },
      { id: 1, dist: 1 },
      { id: null, dist: 2 },
      { id: 2, dist: 1 },
      { id: 2, dist: 0 },
      { id: null, dist: 1 },
      { id: 3, dist: 0 }
    ]])
    t.end()
  })

  g.test('two points in a column', t => {
    const coords = [
      { left: 1, top: 1 },
      { left: 1, top: 3 }
    ]
    const boundary = { top: 1, left: 1, width: 1, height: 3 }

    t.same(findClosestPoints(coords, boundary), [
      [{ id: 0, dist: 0 }],
      [{ id: null, dist: 1 }],
      [{ id: 1, dist: 0 }]
    ])
    t.end()
  })

  g.test('triangle', t => {
    const coords = [
      { top: 1, left: 2 },
      { top: 2, left: 3 },
      { top: 3, left: 0 }
    ]
    const boundary = { top: 1, left: 0, width: 4, height: 3 }

    t.same(findClosestPoints(coords, boundary), [
      [
        { id: null, dist: 2 },
        { id: 0, dist: 1 },
        { id: 0, dist: 0 },
        { id: null, dist: 1 }
      ],
      [
        { id: 2, dist: 1 },
        { id: null, dist: 2 },
        { id: null, dist: 1 },
        { id: 1, dist: 0 }
      ],
      [
        { id: 2, dist: 0 },
        { id: 2, dist: 1 },
        { id: null, dist: 2 },
        { id: 1, dist: 1 }
      ]
    ])
    t.end()
  })

  g.end()
})

test('getAreas', g => {
  g.test('single point', t => {
    const field = [[{ id: 0, dist: 0 }]]

    t.same(getAreas(field), [[{ top: 0, left: 0 }]])
    t.end()
  })

  g.test('two points in a row', t => {
    const field = [[
      { id: 0, dist: 0 },
      { id: null, dist: 1 },
      { id: 1, dist: 0 }
    ]]

    t.same(getAreas(field), {
      0: [{ top: 0, left: 0 }],
      1: [{ top: 0, left: 2 }],
      null: [{ top: 0, left: 1 }]
    })
    t.end()
  })

  g.test('triangle', t => {
    const field = [
      [{ id: 2, dist: 0 }, { id: null, dist: 1 }],
      [{ id: 4, dist: 0 }, { id: 5, dist: 5 }]
    ]

    t.same(getAreas(field), {
      2: [{ top: 0, left: 0 }],
      4: [{ top: 1, left: 0 }],
      5: [{ top: 1, left: 1 }],
      null: [{ top: 0, left: 1 }]
    })
    t.end()
  })

  g.end()
})

test('getBoundaryPoints', g => {
  g.test('two points in a row', t => {
    const boundary = { left: 0, top: 0, height: 1, width: 1 }
    const field = [[
      { id: 0, dist: 0 },
      { id: null, dist: 1 },
      { id: 1, dist: 0 }
    ]]

    t.same(getBoundaryPoints(field, boundary), [0, 1])
    t.end()
  })

  g.test('one hidden point', t => {
    const boundary = { left: 0, top: 0, height: 3, width: 3 }
    const field = [
      [{ id: 0 }, { id: 0 }, { id: 1 }],
      [{ id: 2 }, { id: 8 }, { id: 1 }],
      [{ id: 3 }, { id: 1 }, { id: 1 }]
    ]

    t.same(getBoundaryPoints(field, boundary), [0, 1, 2, 3])
    t.end()
  })

  g.end()
})

test('findLargestFiniteArea', g => {
  g.test('given example', t => {
    const coords = [
      { left: 1, top: 1 },
      { left: 1, top: 6 },
      { left: 8, top: 3 },
      { left: 3, top: 4 },
      { left: 5, top: 5 },
      { left: 8, top: 9 }
    ]

    t.same(findLargestFiniteArea(coords).length, 17)
    t.end()
  })

  g.test('null is ignored in output', t => {
    const coords = [
      { left: 0, top: 0 },
      { left: 1, top: 1 },
      { left: 2, top: 2 }
    ]

    t.same(findLargestFiniteArea(coords).length, 1)
    t.end()
  })

  g.test('infinite values are ignored', t => {
    const coords = [
      { left: 0, top: 0 },
      { left: 0, top: 5 },
      { left: 5, top: 0 },
      { left: 5, top: 5 },
      { left: 3, top: 3 },
      { left: 5, top: 15 }
    ]

    t.same(findLargestFiniteArea(coords).length, 10)
    t.end()
  })

  g.end()
})

test('findSafeRegion', g => {
  g.test('given example', t => {
    const coords = [
      { left: 1, top: 1 },
      { left: 1, top: 6 },
      { left: 8, top: 3 },
      { left: 3, top: 4 },
      { left: 5, top: 5 },
      { left: 8, top: 9 }
    ]

    t.equal(findSafeRegion(coords, 32).length, 16)
    t.end()
  })

  g.end()
})
