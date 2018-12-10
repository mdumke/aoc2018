/*
 * The Stars Align
 *
 * Problem statement: adventofcode.com/2018/day/10
 */

const fs = require('fs')
const { findMessage } = require('./lib')

const parse = line =>
  line.match(/< ?(\S+),  ?(\S+)>.*< ?(\S+),  ?(\S+)>/).slice(1).map(Number)

const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    const input = data
      .trim()
      .split('\n')
      .map(parse)
      .reduce((acc, [ x, y, vx, vy ]) => {
        acc.points.push([x, y])
        acc.velocities.push([vx, vy])
        return acc
      }, { points: [], velocities: [] })

    cb(input)
  })
}

getInput(({ points, velocities }) => {
  const message = findMessage(points, velocities)

  console.log(`Day 10.1: \n${message.show}`)
  console.log(`Day 10.2: ${message.seconds}`)
})
