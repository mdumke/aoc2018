/*
 * Chronal Coordinates
 *
 * Problem statement: adventofcode.com/2018/day/6
 */

const {
  findLargestFiniteArea,
  findSafeRegion,
  getCoordinates
} = require('./lib')

getCoordinates(coords => {
  console.log(`Day 6.1: ${findLargestFiniteArea(coords).length}`)
  console.log(`Day 6.2: ${findSafeRegion(coords, 10000).length}`)
})
