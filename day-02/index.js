/*
 * Inventory Management System
 *
 * Problem statement: adventofcode.com/2018/day/2
 */

const {
  checksum,
  commonChars,
  findClosePairs,
  getBoxIds
} = require('./inventory')

// solve riddles
getBoxIds(ids => {
  console.log(`Day 2.1: ${checksum(ids)}`)
  console.log(`Day 2.2: ${commonChars(...findClosePairs(ids)[0])}`)
})
