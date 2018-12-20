/*
 *
 *
 * Problem statement: adventofcode.com/2018/day/20
 */

const fs = require('fs')

const getInput = cb => {
  fs.readFile('program.txt', 'utf8', (_, data) => cb(data))
}

getInput(data => {
  console.log(data)
})
