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
  const graph = new Graph(data)

  console.log(`Day 20.1: ${graph.findLongestShortestPath([0, 0])}`)
  console.log(`Day 20.2: ${graph.countLongShortestPaths()}`)
})
