const { test } = require('tap')
const {
  computeOverlap,
  countOverlappingSquares,
  findIntactClaims,
  findOverlappingSquares,
  parseClaim
} = require('./slicing')

test('parseClaim', g => {
  g.test('claim #123 @ 3,2: 5x4', t => {
    t.same(parseClaim('#123 @ 3,2: 5x4'), {
      id: 123, left: 3, top: 2, width: 5, height: 4
    })
    t.end()
  })

  g.test('claim #78 @ 466,172: 23x21', t => {
    t.same(parseClaim('#78 @ 466,172: 23x21'), {
      id: 78, left: 466, top: 172, width: 23, height: 21
    })
    t.end()
  })

  g.end()
})

test('computeOverlap', g => {
  g.test('small adjacent patches', t => {
    const claim1 = { left: 0, top: 0, width: 1, height: 1 }
    const claim2 = { left: 1, top: 0, width: 1, height: 1 }

    t.same(computeOverlap(claim1, claim2), [])
    t.end()
  })

  g.test('small identical patch', t => {
    const claim1 = { left: 0, top: 0, width: 1, height: 1 }
    const claim2 = { left: 0, top: 0, width: 1, height: 1 }

    t.same(computeOverlap(claim1, claim2), [{ left: 0, top: 0 }])
    t.end()
  })

  g.test('medium identical patch', t => {
    const claim1 = { left: 0, top: 0, width: 2, height: 3 }
    const claim2 = { left: 0, top: 0, width: 2, height: 3 }

    t.same(computeOverlap(claim1, claim2), [
      { left: 0, top: 0 },
      { left: 1, top: 0 },
      { left: 0, top: 1 },
      { left: 1, top: 1 },
      { left: 0, top: 2 },
      { left: 1, top: 2 }
    ])
    t.end()
  })

  g.test('medium overlapping patches', t => {
    const claim1 = { left: 0, top: 0, width: 2, height: 3 }
    const claim2 = { left: 1, top: 1, width: 2, height: 3 }

    t.same(computeOverlap(claim1, claim2), [
      { left: 1, top: 1 },
      { left: 1, top: 2 }
    ])
    t.end()
  })

  g.test('claim order does not break functionality', t => {
    const claim1 = { left: 1, top: 1, width: 2, height: 3 }
    const claim2 = { left: 0, top: 0, width: 2, height: 3 }

    t.same(computeOverlap(claim1, claim2), [
      { left: 1, top: 1 },
      { left: 1, top: 2 }
    ])
    t.end()
  })

  g.test('works with two offset regions', t => {
    const claim1 = { left: 1, top: 1, width: 2, height: 3 }
    const claim2 = { left: 2, top: 2, width: 2, height: 3 }

    t.same(computeOverlap(claim1, claim2), [
      { left: 2, top: 2 },
      { left: 2, top: 3 }
    ])
    t.end()
  })

  g.test('included region', t => {
    const claim1 = { left: 2, top: 3, width: 1, height: 2 }
    const claim2 = { left: 2, top: 4, width: 1, height: 1 }

    t.same(computeOverlap(claim1, claim2), [{ left: 2, top: 4 }])
    t.same(computeOverlap(claim2, claim1), [{ left: 2, top: 4 }])
    t.end()
  })

  g.test('given example 1', t => {
    const claim1 = { left: 1, top: 3, width: 4, height: 4 }
    const claim2 = { left: 3, top: 1, width: 4, height: 4 }

    t.same(computeOverlap(claim1, claim2), [
      { left: 3, top: 3 },
      { left: 4, top: 3 },
      { left: 3, top: 4 },
      { left: 4, top: 4 }
    ])
    t.same(computeOverlap(claim2, claim1), [
      { left: 3, top: 3 },
      { left: 4, top: 3 },
      { left: 3, top: 4 },
      { left: 4, top: 4 }
    ])
    t.end()
  })

  g.test('given example 2', t => {
    const claim1 = { left: 1, top: 3, width: 4, height: 4 }
    const claim2 = { left: 5, top: 5, width: 2, height: 2 }

    t.same(computeOverlap(claim1, claim2), [])
    t.end()
  })

  g.end()
})

test('findOverlappingSquares', g => {
  g.test('handles completely distinct regions', t => {
    const claims = [
      { left: 1, top: 3, width: 1, height: 3 },
      { left: 3, top: 3, width: 1, height: 1 },
      { left: 5, top: 4, width: 2, height: 2 },
      { left: 1, top: 6, width: 2, height: 1 }
    ]

    t.same(findOverlappingSquares(claims), {})
    t.end()
  })

  g.test('handles adjacent regions', t => {
    const claims = [
      { left: 1, top: 1, width: 2, height: 2 },
      { left: 3, top: 1, width: 1, height: 3 },
      { left: 1, top: 3, width: 2, height: 1 }
    ]

    t.same(findOverlappingSquares(claims), {})
    t.end()
  })

  g.test('handles two overlapping regions', t => {
    const claims = [
      { left: 0, top: 0, width: 2, height: 2 },
      { left: 2, top: 0, width: 2, height: 2 },
      { left: 3, top: 0, width: 2, height: 2 }
    ]

    t.same(findOverlappingSquares(claims), { 3: [0, 1] })
    t.end()
  })

  g.test('handles multiple overlapping regions', t => {
    const claims = [
      { left: 1, top: 3, width: 4, height: 1 },
      { left: 2, top: 2, width: 2, height: 3 },
      { left: 3, top: 1, width: 3, height: 5 }
    ]

    t.same(findOverlappingSquares(claims), {
      2: [3],
      3: [2, 3, 4],
      4: [3]
    })
    t.end()
  })

  g.test('handles a more complex example', t => {
    const claims = [
      { left: 1, top: 0, width: 2, height: 3 },
      { left: 4, top: 0, width: 1, height: 2 },
      { left: 2, top: 1, width: 4, height: 3 },
      { left: 5, top: 2, width: 2, height: 1 },
      { left: 5, top: 2, width: 1, height: 3 }
    ]

    t.same(findOverlappingSquares(claims), {
      2: [1, 2],
      4: [1],
      5: [2, 3]
    })
    t.end()
  })

  g.test('given example', t => {
    const claims = [
      { left: 1, top: 3, width: 4, height: 4 },
      { left: 3, top: 1, width: 4, height: 4 },
      { left: 5, top: 5, width: 2, height: 2 }
    ]

    t.same(findOverlappingSquares(claims), {
      3: [3, 4],
      4: [3, 4]
    })
    t.end()
  })

  g.end()
})

test('countOverlappingSquares', g => {
  g.test('simple example', t => {
    const claims = [
      { left: 0, top: 0, width: 2, height: 2 },
      { left: 2, top: 0, width: 2, height: 2 },
      { left: 3, top: 0, width: 2, height: 2 }
    ]

    t.equal(countOverlappingSquares(claims), 2)
    t.end()
  })

  g.test('complex example', t => {
    const claims = [
      { left: 1, top: 0, width: 2, height: 3 },
      { left: 4, top: 0, width: 1, height: 2 },
      { left: 2, top: 1, width: 4, height: 3 },
      { left: 5, top: 2, width: 2, height: 1 },
      { left: 5, top: 2, width: 1, height: 3 }
    ]

    t.equal(countOverlappingSquares(claims), 5)
    t.end()
  })

  g.test('given example', t => {
    const claims = [
      { left: 1, top: 3, width: 4, height: 4 },
      { left: 3, top: 1, width: 4, height: 4 },
      { left: 5, top: 5, width: 2, height: 2 }
    ]

    t.equal(countOverlappingSquares(claims), 4)
    t.end()
  })

  g.end()
})

test('findIntactClaims', g => {
  g.test('handles missing intact claims', t => {
    const claims = [
      { id: 1, left: 0, top: 0, width: 2, height: 2 },
      { id: 3, left: 1, top: 0, width: 2, height: 2 }
    ]

    t.same(findIntactClaims(claims), [])
    t.end()
  })

  g.test('two adjacent claims', t => {
    const claims = [
      { id: 2, left: 0, top: 0, width: 2, height: 2 },
      { id: 3, left: 2, top: 0, width: 2, height: 2 }
    ]

    t.same(findIntactClaims(claims), [2, 3])
    t.end()
  })

  g.test('three claims, one intact', t => {
    const claims = [
      { id: 7, left: 0, top: 0, width: 2, height: 2 },
      { id: 8, left: 1, top: 0, width: 2, height: 2 },
      { id: 9, left: 3, top: 0, width: 2, height: 2 }
    ]

    t.same(findIntactClaims(claims), [9])
    t.end()
  })

  g.test('complex example', t => {
    const claims = [
      { id: 5, left: 0, top: 3, width: 4, height: 1 },
      { id: 7, left: 1, top: 2, width: 1, height: 3 },
      { id: 2, left: 3, top: 3, width: 1, height: 4 },
      { id: 6, left: 0, top: 5, width: 3, height: 2 }
    ]

    t.same(findIntactClaims(claims), [6])
    t.end()
  })

  g.test('given example', t => {
    const claims = [
      { id: 1, left: 1, top: 3, width: 4, height: 4 },
      { id: 2, left: 3, top: 1, width: 4, height: 4 },
      { id: 3, left: 5, top: 5, width: 2, height: 2 }
    ]

    t.same(findIntactClaims(claims), [3])
    t.end()
  })

  g.end()
})
