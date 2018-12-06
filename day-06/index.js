/*
 * Chronal Coordinates
 *
 * Problem statement: adventofcode.com/2018/day/6
 */

const {
  findLargestFiniteArea,
  getCoordinates
} = require('./lib')

getCoordinates(coords => {
  console.log(findLargestFiniteArea(coords).length)
})
