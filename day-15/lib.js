/*
 * battle simulation helpers
 *
 */

const { Board } = require('./board')
const { sum } = require('../utils')

// returns the lowest strength at which no elf will be killed
const findOptimalStrength = data => {
  let initialNumElfs = new Board(data).numElfs
  let strength = 4

  while (strength++) {
    const board = new Board(data, strength)
    simulateBattle(board)

    if (board.numElfs === initialNumElfs) break
  }

  return strength
}

// returns #rounds * remaining HPs after finishing the battle
const computeBattleOutcome = (data, elfStrength = 3) => {
  const board = new Board(data, elfStrength)

  const fullRounds = simulateBattle(board) - 1
  const hps = board.units.filter(Boolean).map(u => u.hp).reduce(sum)

  return fullRounds * hps
}

// returns the current round in which the battle completes
const simulateBattle = board => {
  let round = 0

  while (++round) {
    board.sortUnits()

    for (let i = 0; i < board.units.length; i++) {
      if (board.isFinished()) return round
      if (board.units[i] === null) continue

      board.move(board.units[i])
      board.attack(board.units[i])
    }
  }
}

module.exports = {
  computeBattleOutcome,
  findOptimalStrength,
  simulateBattle
}
