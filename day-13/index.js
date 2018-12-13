/*
 * Mine Cart Madness
 *
 * Problem statement: adventofcode.com/2018/day/13
 */

const fs = require('fs')
const { getInput, findFirstCollision } = require('./lib')

getInput(({ tracks, carts }) => {
  console.log(findFirstCollision(tracks, carts))
})
