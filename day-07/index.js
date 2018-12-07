/*
 * The Sum of Its Parts
 *
 * Problem statement: adventofcode.com/2018/day/7
 */

const { getEdges, findProcessingOrder } = require('./lib')

getEdges(edges => {
  console.log(`Day 7.1: ${findProcessingOrder(edges)}`)
})
