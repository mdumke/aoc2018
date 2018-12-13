const fs = require('fs')

// returns { track, carts } from input.txt
const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(parseInput(data.trim().split('\n')))
  })
}

// advances carts and returns first colliding one
const findFirstCollision = (tracks, carts) => {
  while (true) {
    for (let cart of carts) {
      cart.move(tracks)

      if (isCollision(carts)) return [cart.x, cart.y]
    }
  }
}

// returns true if any two carts are on the same coords
const isCollision = carts => {
  const positions = {}

  for (let cart of carts) {
    if (!positions[cart.x]) positions[cart.x] = {}
    if (positions[cart.x][cart.y]) return true

    positions[cart.x][cart.y] = true
  }

  return false
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

module.exports = { getInput, parseInput, Cart, isCollision, findFirstCollision }
