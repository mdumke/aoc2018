const fs = require('fs')
const Queue = require('js-priority-queue')
const Cube = require('./cube')
const { manhattan } = require('../utils')

// returns the { x, y, z } position that is in range of most bots
const findMostCoveredPoint = bots => {
  const cube = new Cube([0, 0, 0], Math.pow(2, 32))

  // explore by most promising and closest to zero
  const comparator = (a, b) => a.count !== b.count
    ? b.count - a.count
    : manhattan(a.cube) - manhattan(b.cube)

  const fringe = new Queue({
    comparator,
    initialValues: [{ cube, count: cube.countBotsInRange(bots) }]
  })

  let current

  while (true) {
    current = fringe.dequeue()

    if (current.cube.range === 0) return current

    for (let cube of current.cube.split()) {
      fringe.queue({ cube, count: cube.countBotsInRange(bots) })
    }
  }
}

const parseLine = line => {
  const [ x, y, z, r ] = line
    .match(/<(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/)
    .slice(1)
    .map(Number)

  return { x, y, z, range: r }
}

const getInput = (filename, cb) => {
  fs.readFile(filename, 'utf8', (_, data) => {
    cb(data.trim().split('\n').filter(Boolean).map(parseLine))
  })
}

module.exports = {
  findMostCoveredPoint,
  getInput,
  parseLine
}
