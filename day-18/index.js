/*

 *
 * Problem statement: adventofcode.com/2018/day/18
 */

const fs = require('fs')
const { Field } = require('./lib')

const readData = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => cb(data))
}

readData(data => {
  const field = new Field(data)
  field.ticks(10)

  console.log(`Day 18.1: ${field.resourceValue}`)
})
