/*
 * The Stars Align
 *
 * Problem statement: adventofcode.com/2018/day/10
 */

const { getInput, findMessage } = require('./lib')

getInput(({ points, velocities }) => {
  const message = findMessage(points, velocities)

  console.log(`Day 10.1: \n${message.show}`)
  console.log(`Day 10.2: ${message.seconds}`)
})
