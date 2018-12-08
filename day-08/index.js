/*
 * Memory Maneuver
 *
 * Problem statement: adventofcode.com/2018/day/8
 */

const fs = require('fs')
const Tree = require('./tree')

const getTreeData = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data.trim().split(' ').map(Number))
  })
}

getTreeData(data => {
  const tree = new Tree(data)

  console.log(`Day 8.1: ${tree.sumMetadata()}`)
})
