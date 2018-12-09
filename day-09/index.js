/*
 * Marble Mania
 *
 * Problem statement: adventofcode.com/2018/day/9
 */

const fs = require('fs')
const Game = require('./lib')

const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data
      .trim()
      .match(/(\d+) players.* (\d+) points/)
      .slice(1)
      .map(Number))
  })
}

getInput(([ players, numMarbles ]) => {
  const game1 = new Game(players)
  const game2 = new Game(players)

  game1.simulate(numMarbles)
  game2.simulate(numMarbles * 100)

  console.log(`Day 9.1: ${game1.getWinningScore()}`)
  console.log(`Day 9.2: ${game2.getWinningScore()}`)
})
