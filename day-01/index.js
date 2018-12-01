/*
 * Calibrate a chronal device through frequency changes
 *
 * Problem statement: adventofcode.com/2018/day/1
 */

const {
  findRepeatedFrequency,
  getInputValues,
  sumValues
} = require('./calibrate')

// solve day 1 riddles
getInputValues(changes => {
  console.log(`Day 1.1: ${sumValues(changes)}`)
  console.log(`Day 1.2: ${findRepeatedFrequency(changes)}`)
})
