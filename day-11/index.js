/*
 * Chronal Charge
 *
 * Problem statement: adventofcode.com/2018/day/11
 */

const {
  getFuelGrid,
  findLargestPatch,
  findLargestPatchOfAnySize
} = require('./lib')

const serialNumber = 5034
const grid = getFuelGrid(serialNumber)

console.log(`Day 11.1: ${findLargestPatch(3, grid)}`)
console.log(`Day 11.2: ${findLargestPatchOfAnySize(5034)}`)
