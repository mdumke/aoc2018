/*
 * Marble Mania game class manages game state and simulation
 *
 */

const { max } = require('../utils')

class Game {
  constructor (numPlayers) {
    this.current = this.initCircle()
    this.scores = Array(numPlayers).fill(0)
  }

  // handles the marble with the given id
  play (id) {
    if (id % 23 !== 0) return this.insert(id)

    for (let i = 0; i < 6; i++) {
      this.current = this.current.prev
    }

    this.scores[this.getPlayer(id)] += id + this.current.prev.id
    this.remove(this.current.prev)
  }

  // inserts a marble with given id and sets it as current
  insert (id) {
    let marble = new Marble(id)
    let after = this.current.next

    marble.next = after.next
    marble.prev = after
    after.next.prev = marble
    after.next = marble

    this.current = marble
  }

  // removes the given node from the circle
  remove (node) {
    node.prev.next = node.next
    node.next.prev = node.prev
    node.next = null
    node.prev = null
  }

  // returns the current player's id
  getPlayer (marbleId) {
    return marbleId % this.scores.length
  }

  // returns the current high score
  getWinningScore () {
    return this.scores.reduce(max, 0)
  }

  // returns a circle with only 0 in it
  initCircle () {
    const zero = new Marble(0)
    zero.next = zero
    zero.prev = zero
    return zero
  }

  // runs the game, adding the given number of marbles
  simulate (numMarbles) {
    for (let i = 1; i <= numMarbles; i++) this.play(i)
  }
}

class Marble {
  constructor (id) {
    this.id = id
    this.next = null
    this.prev = null
  }
}

module.exports = Game
