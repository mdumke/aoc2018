/*
 * Utilities for managing process order computation
 *
 */

const fs = require('fs')
const Graph = require('./graph')

// returns the total assemble time according to problem spec
const computeAssemblyTime = (edges, numWorkers) =>
  new Graph(edges, 26).assemble(numWorkers, node => {
    return 60 + node + 1
  })

// returns a string of letters in correct execution order
const findProcessingOrder = edges =>
  new Graph(edges, 26)
    .findProcessingOrder()
    .map(numberToLetter)
    .join('')

// returns edge-data read from input.txt
const getEdges = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data.trim().split('\n').map(parseLine))
  })
}

// returns edge-values as array [from, to]
const parseLine = line => line
  .match(/^Step (\w) .* (\w) can begin.$/)
  .slice(1)
  .map(letterToNumber)

// convert letter to alphabet position and back
const letterToNumber = l => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(l)
const numberToLetter = n => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n]

module.exports = {
  getEdges,
  computeAssemblyTime,
  findProcessingOrder
}
