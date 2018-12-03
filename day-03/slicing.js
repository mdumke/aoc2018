/*
 * Functions to compute overlapping claims, plus utilities
 *
 */

const fs = require('fs')

// return ids of claims that don't conflict with any other
const findIntactClaims = claims => {
  let intact = []
  let isIntact

  claims.forEach((claim1, i) => {
    isIntact = true

    claims.forEach((claim2, k) => {
      if (i === k) return
      if (computeOverlap(claim1, claim2).length) isIntact = false
    })

    if (isIntact) intact.push(claim1.id)
  })

  return intact
}

// returns the number of square inches covered by multiple claims
const countOverlappingSquares = claims => {
  const squares = findOverlappingSquares(claims)

  return Object.values(squares).reduce((memo, list) => {
    return memo + list.length
  }, 0)
}

// returns overlapping squares as adjacency list { left: [top1, top2, ...] }
const findOverlappingSquares = claims => {
  const squares = {}

  for (let i = 0; i < claims.length - 1; i++) {
    for (let k = i + 1; k < claims.length; k++) {
      computeOverlap(claims[i], claims[k]).forEach(s => {
        squares[s.left] = squares[s.left] || new Set()
        squares[s.left].add(s.top)
      })
    }
  }

  for (let left in squares) {
    squares[left] = Array.from(squares[left]).sort()
  }

  return squares
}

// returns a list of overlapping squares from two claims
const computeOverlap = (c1, c2) => {
  const left = Math.max(c1.left, c2.left)
  const width = Math.min(c1.left + c1.width, c2.left + c2.width) - left

  const top = Math.max(c1.top, c2.top)
  const height = Math.min(c1.top + c1.height, c2.top + c2.height) - top

  return squareListFromRegion(left, top, width, height)
}

// returns a list of positions (left, top) covered by the given region
const squareListFromRegion = (left, top, width, height) => {
  const squares = []

  for (let t = 0; t < height; t++) {
    for (let w = 0; w < width; w++) {
      squares.push({ left: left + w, top: top + t })
    }
  }

  return squares
}

// returns parsed claim data from input.txt
const getClaims = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data.trim().split('\n').map(parseClaim))
  })
}

// returns an object of numerical values from the raw claim data
const parseClaim = line => {
  const [ id, left, top, width, height ] = line
    .match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/)
    .slice(1, 6)
    .map(Number)

  return { id, left, top, width, height }
}

module.exports = {
  computeOverlap,
  countOverlappingSquares,
  getClaims,
  findIntactClaims,
  findOverlappingSquares,
  parseClaim
}
