/*
 * Alchemical Reduction
 *
 * Problem statement: adventofcode.com/2018/day/5
 */

const { getPolymer, computeReaction } = require('./lib')

getPolymer(polymer => {
  console.log(`Day 5.1: ${computeReaction(polymer).length}`)
})
