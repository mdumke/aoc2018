/*
 * Fabric slicing
 *
 * Problem statement: adventofcode.com/2018/day/3
 */

const { getClaims, countOverlappingSquares } = require('./slicing')

getClaims(claims => {
  console.log(`Day 3.1: ${countOverlappingSquares(claims)}`)
})
