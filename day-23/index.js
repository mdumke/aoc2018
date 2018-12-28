/*
 * Experimental Emergency Teleportation
 *
 */

const { manhattan } = require('../utils')
const {
  getInput,
  findInRange,
  findStrongest,
  findMostCoveredPoint
} = require('./lib')

getInput('input.txt', bots => {
  console.log(`Day 23.1: ${findInRange(bots, findStrongest(bots)).length}`)
  console.log(`Day 23.2: ${manhattan(findMostCoveredPoint(bots).cube)}`)
})
