/*
 * Subterranean Sustainability
 *
 * Problem statement: adventofcode.com/2018/day/12
 */

const fs = require('fs')
const { evaluate, evolve } = require('./lib')

// returns [initial state, evolution rules] from input.txt
const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    const lines = data.trim().split('\n')
    const rules = lines.slice(1).reduce((lookup, line) => {
      lookup[line.substr(0, 5)] = line[9] === '#'
      return lookup
    }, {})

    cb(lines[0].slice(15), rules)
  })
}

getInput((init, rules) => {
  console.log(`Day 12.1: ${evaluate(...evolve(init, 20, rules))}`)
  console.log(`Day 12.2: ${evaluate(...evolve(init, 50000000000, rules))}`)
})
