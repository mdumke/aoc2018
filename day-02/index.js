/*
 * Inventory Management System
 *
 * Problem statement: adventofcode.com/2018/day/2
 */

const { checksum, getBoxIds } = require('./inventory')

getBoxIds(ids => {
  console.log(`Day 2.1: ${checksum(ids)}`)
})
