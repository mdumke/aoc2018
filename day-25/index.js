/*
 * Four-Dimensional Adventure
 *
 */

const { assembleConstellations, getInput } = require('./lib')

getInput(coords => {
  console.log(`Day 25.1: ${assembleConstellations(coords).length}`)
})
