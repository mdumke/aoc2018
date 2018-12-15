/*
 * Beverage Bandits
 *
 * Problem statement: adventofcode.com/2018/day/15
 */

const fs = require('fs')
const { computeBattleOutcome, findOptimalStrength } = require('./lib')

// returns cavern-data from input.txt
const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data)
  })
}

getInput(data => {
  const strength = findOptimalStrength(data)

  console.log(`Day 15.1: ${computeBattleOutcome(data, 3)}`)
  console.log(`Day 15.2: ${computeBattleOutcome(data, strength)}`)
})
