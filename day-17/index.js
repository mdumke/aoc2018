/*
 * Reservoir Research
 *
 * Problem statement: adventofcode.com/2018/day/17
 */

const fs = require('fs')
const { Field, parseInput } = require('./lib')

const readData = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => cb(data))
}

readData(scan => {
  const field = new Field(...parseInput(scan))
  field.fill()

  console.log(`Day 17.1: ${field.countWater()}`)
  console.log(`Day 17.2: ${field.countWater(['~'])}`)
})
