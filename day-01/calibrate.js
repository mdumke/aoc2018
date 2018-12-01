/*
 * Find a final frequency value after incremental changes
 *
 * Problem statement: adventofcode.com/2018/day/1
 */

const fs = require('fs')

// reads integer input values from the input file
const getFrequencyChanges = cb => {
  fs.readFile('input.txt', 'utf8', (err, data) => {
    cb(data.split('\n').map(Number))
  })
}

// read and sum up frequency changes to get the final value
getFrequencyChanges(values => {
  const total = values.reduce((acc, v) => acc + v)
  console.log(total)
})
