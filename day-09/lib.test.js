const { test } = require('tap')
const Game = require('./lib')

test('marble management', g => {
  g.test('setup', t => {
    const game = new Game(1)
    t.equal(game.current.id, 0)
    t.equal(game.current.next.id, 0)
    t.equal(game.current.prev.id, 0)
    t.end()
  })

  g.test('adding 1', t => {
    const game = new Game(1)
    game.play(1)
    t.equal(game.current.id, 1)
    t.equal(game.current.next.id, 0)
    t.equal(game.current.prev.id, 0)
    t.end()
  })

  g.test('adding 2', t => {
    const game = new Game(1)
    game.play(1)
    game.play(2)
    t.equal(game.current.id, 2)
    t.equal(game.current.next.id, 1)
    t.equal(game.current.prev.id, 0)
    t.end()
  })

  g.test('adding 22', t => {
    const game = new Game(1)

    for (let i = 1; i <= 22; i++) game.play(i)
    t.equal(game.current.id, 22)
    t.equal(game.current.next.id, 11)
    t.equal(game.current.prev.id, 5)
    t.end()
  })

  g.test('adding 23', t => {
    const game = new Game(1)

    for (let i = 1; i <= 23; i++) game.play(i)
    t.equal(game.current.id, 19)
    t.equal(game.current.next.id, 2)
    t.equal(game.current.prev.id, 18)
    t.end()
  })

  g.test('adding 25', t => {
    const game = new Game(1)

    for (let i = 1; i <= 25; i++) game.play(i)
    t.equal(game.current.id, 25)
    t.equal(game.current.next.id, 10)
    t.equal(game.current.prev.id, 20)
    t.end()
  })

  g.end()
})

test('score tracking', g => {
  g.test('9 players until 25', t => {
    const game = new Game(9)
    for (let i = 1; i <= 25; i++) game.play(i)
    t.same(game.getWinningScore(), 32)
    t.end()
  })

  g.test('given example 1', t => {
    const game = new Game(10)
    for (let i = 1; i <= 1618; i++) game.play(i)
    t.same(game.getWinningScore(), 8317)
    t.end()
  })

  g.test('given example 2', t => {
    const game = new Game(13)
    for (let i = 1; i <= 7999; i++) game.play(i)
    t.same(game.getWinningScore(), 146373)
    t.end()
  })

  g.test('given example 3', t => {
    const game = new Game(17)
    for (let i = 1; i <= 1104; i++) game.play(i)
    t.same(game.getWinningScore(), 2764)
    t.end()
  })

  g.test('given example 4', t => {
    const game = new Game(21)
    for (let i = 1; i <= 6111; i++) game.play(i)
    t.same(game.getWinningScore(), 54718)
    t.end()
  })

  g.test('given example 5', t => {
    const game = new Game(30)
    for (let i = 1; i <= 5807; i++) game.play(i)
    t.same(game.getWinningScore(), 37305)
    t.end()
  })

  g.end()
})
