/*
 * Beverage Bandits
 *
 * Problem statement: adventofcode.com/2018/day/15
 */

const fs = require('fs')
const { Board } = require('./lib')
const { sum } = require('../utils')

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

// returns cavern-data from input.txt
const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data)
  })
}

getInput(data => {
  const board = new Board(data)
  const fullRounds = simulateBattle(board) - 1
  const hps = board.units.filter(Boolean).map(u => u.hp).reduce(sum)

  console.log(fullRounds * hps)
})
