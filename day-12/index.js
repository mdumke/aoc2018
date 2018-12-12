/*
 * Subterranean Sustainability
 *
 * Problem statement: adventofcode.com/2018/day/12
 */

const { evaluate, evolve, getInput } = require('./lib')

getInput((init, rules) => {
  console.log(`Day 12.1: ${evaluate(...evolve(init, 20, rules))}`)
})
