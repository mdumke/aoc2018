/*
 * Immune System Simulator 20XX
 *
 */

const { findUnitsAfterBattle, getInput } = require('./lib')

let groups, counts

// part 1
groups = getInput('input.txt')
console.log(`Day 24.1: ${findUnitsAfterBattle(groups).infection}`)

// part 2
let i = 1

while (i++) {
  groups = getInput('input.txt')
  counts = findUnitsAfterBattle(groups, i)

  if (counts.immune > 0 && counts.infection === 0) break
}

console.log(`Day 24.2: ${counts.immune}`)
