/*
 * mine cart computations
 *
 */

const fs = require('fs')

// removes the last cart on the track after crashing carts removed
const findLastStandingCart = (tracks, carts) => {
  while (carts.length > 1) {
    carts = tick(tracks, sortCarts(carts, tracks[0].length))
  }

  return [carts[0].x, carts[0].y]
}

// advances all carts and returns the ones that did not crash
const tick = (tracks, carts) => {
  let newCollisions

  for (let i = 0; i < carts.length; i++) {
    if (!carts[i]) continue

    carts[i].move(tracks)
    newCollisions = findCollidingCarts(carts)

    if (newCollisions.length) {
      for (let index of newCollisions) {
        carts[index] = null
      }
    }
  }

  return carts.filter(Boolean)
}

// returns carts sorted from left to right, then top to bottom
const sortCarts = (carts, boardSize) => carts
  .sort((c1, c2) => (c1.x * boardSize + c1.y) - (c2.x * boardSize + c2.y))

// returns array of all cart-ids to remove
const findCollidingCarts = carts => {
  const col = findCollision(carts)

  if (!col) return []

  return carts
    .map((c, i) => {
      if (c === null) return null
      return c.x === col[0] && c.y === col[1] ? i : null
    })
    .filter(pos => pos !== null)
}

// returns collision point [x, y] or null
const findCollision = carts => {
  const positions = {}

  for (let cart of carts) {
    if (cart === null) continue

    if (!positions[cart.x]) positions[cart.x] = {}
    if (positions[cart.x][cart.y]) return [cart.x, cart.y]

    positions[cart.x][cart.y] = true
  }

  return null
}

// advances carts and returns first colliding one
const findFirstCollision = (tracks, carts) => {
  while (true) {
    for (let cart of carts) {
      cart.move(tracks)

      if (findCollision(carts)) return [cart.x, cart.y]
    }
  }
}

// returns { track, carts } from raw data
const parseInput = data => {
  const carts = []
  const cartsLookup = {
    '>': '-',
    '<': '-',
    '^': '|',
    'v': '|'
  }

  const tracks = data.map((row, x) => row
    .split('')
    .map((char, y) => {
      if (!cartsLookup[char]) return char

      carts.push(new Cart(x, y, char))
      return cartsLookup[char]
    })
    .join('')
  )

  return { tracks, carts }
}

class Cart {
  constructor (x, y, symbol) {
    // directions are clockwise: ['N', 'E', 'S', 'W']
    const symToDir = symbol => ['^', '>', 'v', '<'].indexOf(symbol)

    this.x = x
    this.y = y
    this.dir = symToDir(symbol)
    this.intersection = 0

    this.moveLookup = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  }

  get direction () {
    return ['N', 'E', 'S', 'W'][this.dir]
  }

  // sets new cart position and direction
  move (tracks) {
    this.updatePosition()
    this.updateDirection(tracks)
  }

  // moves the cart along the current trajectory
  updatePosition () {
    const [ dx, dy ] = this.moveLookup[this.dir]
    this.x += dx
    this.y += dy
  }

  // sets new dir based on current track symbol
  updateDirection (tracks) {
    const symbol = tracks[this.x][this.y]

    // ignore straight tracks
    if (['-', '|'].includes(symbol)) return

    // handle intersections
    if (symbol === '+') return this.turnIntersection()

    // handle curves
    if (symbol === '\\') this.turn([1, 3].includes(this.dir))
    if (symbol === '/') this.turn([0, 2].includes(this.dir))
  }

  // sets new dir
  turn (clockwise = true) {
    if (clockwise) {
      this.dir = (this.dir + 1) % 4
    } else {
      let newDir = (this.dir - 1) % 4
      this.dir = newDir >= 0 ? newDir : 4 + newDir
    }
  }

  // sets new dir
  turnIntersection () {
    if (this.intersection === 0) this.turn(false)
    if (this.intersection === 2) this.turn()

    this.intersection = (this.intersection + 1) % 3
  }
}

// returns { track, carts } from input.txt
const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(parseInput(data.split('\n')))
  })
}

module.exports = {
  getInput,
  parseInput,
  Cart,
  findFirstCollision,
  findLastStandingCart
}
