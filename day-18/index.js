/*
 * Settlers of The North Pole
 *
 * Problem statement: adventofcode.com/2018/day/18
 */

const fs = require('fs')
const { Field, findPeriod } = require('./lib')

const readData = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => cb(data))
}

readData(data => {
  // part 1
  const field1 = new Field(data)
  field1.ticks(10)

  console.log(`Day 18.1: ${field1.resourceValue}`)

  // part 2
  const { first, length } = findPeriod(data)
  const field2 = new Field(data)
  const n = 1000000000
  const numTicks = first + (n - first) % length
  field2.ticks(numTicks)

  console.log(`Day 18.2: ${field2.resourceValue}`)
})
