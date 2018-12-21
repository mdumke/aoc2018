/*
 * A Regular Map
 *
 * Problem statement: adventofcode.com/2018/day/20
 */

const fs = require('fs')
const { Graph } = require('./lib')

const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data.trim())
  })
}

getInput(data => {
  console.log(data.length)
  const graph = new Graph(data)

  console.log(graph.adjacencyList)
})
