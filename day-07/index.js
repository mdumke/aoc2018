/*
 * The Sum of Its Parts
 *
 * Problem statement: adventofcode.com/2018/day/7
 */

const {
  getEdges,
  findProcessingOrder,
  computeAssemblyTime
} = require('./lib')

getEdges(edges => {
  console.log(`Day 7.1: ${findProcessingOrder(edges)}`)
  console.log(`Day 7.2: ${computeAssemblyTime(edges, 5)}`)
})
