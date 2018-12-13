const { test, only } = require('tap')
const {
  removeCollidingCarts,
  findLastStandingCart,
  findFirstCollision,
  parseInput,
  Cart
} = require('./lib')

const example1 = [
  '/->-\\        ',
  '|   |  /----\\',
  '| /-+--+-\\  |',
  '| | |  | v  |',
  '\\-+-/  \\-+--/',
  '  \\------/   '
]

const example2 = [
  '/>-<\\  ',
  '|   |  ',
  '| /<+-\\',
  '| | | v',
  '\\>+</ |',
  '  |   ^',
  '  \\<->/'
]

test('Cart', g => {
  g.test('curves', t => {
    const { tracks } = parseInput(example1)

    const cart1 = new Cart(1, 4, '^')
    t.equal(cart1.direction, 'N')
    cart1.move(tracks)
    t.equal(cart1.x, 0)
    t.equal(cart1.y, 4)
    t.equal(cart1.direction, 'W')

    const cart2 = new Cart(0, 3, '>')
    cart2.move(tracks)
    t.equal(cart2.x, 0)
    t.equal(cart2.y, 4)
    t.equal(cart2.direction, 'S')

    const cart3 = new Cart(4, 3, '>')
    cart3.move(tracks)
    t.equal(cart3.x, 4)
    t.equal(cart3.y, 4)
    t.equal(cart3.direction, 'N')

    const cart4 = new Cart(3, 2, '^')
    cart4.move(tracks)
    t.equal(cart4.x, 2)
    t.equal(cart4.y, 2)
    t.equal(cart4.direction, 'E')

    t.end()
  })

  g.test('intersection from 3,7 N', t => {
    const { tracks } = parseInput(example1)

    const cart1 = new Cart(3, 7, '^')
    cart1.intersection = 0
    cart1.move(tracks)
    t.equal(cart1.x, 2)
    t.equal(cart1.y, 7)
    t.equal(cart1.direction, 'W')

    const cart2 = new Cart(3, 7, '^')
    cart2.intersection = 1
    cart2.move(tracks)
    t.equal(cart2.x, 2)
    t.equal(cart2.y, 7)
    t.equal(cart2.direction, 'N')

    const cart3 = new Cart(3, 7, '^')
    cart3.intersection = 2
    cart3.move(tracks)
    t.equal(cart3.x, 2)
    t.equal(cart3.y, 7)
    t.equal(cart3.direction, 'E')
    t.equal(cart3.intersection, 0)

    const cart5 = new Cart(2, 8, '>')
    cart5.move(tracks)
    t.equal(cart5.x, 2)
    t.equal(cart5.y, 9)
    t.equal(cart5.direction, 'S')
    t.end()
  })

  g.test('longer ride', t => {
    const { tracks } = parseInput(example1)
    const cart = new Cart(0, 2, '>')

    for (let i = 0; i < 2000; i++) {
      cart.move(tracks)
    }

    t.end()
  })

  g.end()
})

test('findFirstCollision', g => {
  const { tracks, carts } = parseInput(example1)
  g.same(findFirstCollision(tracks, carts), [3, 7])
  g.end()
})

test('findLastStandingCart', t => {
  const { tracks, carts } = parseInput(example2)
  t.same(findLastStandingCart(tracks, carts), [4, 6])
  t.end()
})
