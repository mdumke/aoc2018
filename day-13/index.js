/*
 * Mine Cart Madness
 *
 * Problem statement: adventofcode.com/2018/day/13
 */

const fs = require('fs')
const { getInput, findFirstCollision, findLastStandingCart } = require('./lib')

getInput(({ tracks, carts }) => {
  console.log(`Day 13.1: (row, col) = ${findFirstCollision(tracks, carts)}`)
  console.log(`Day 13.2: (row, col) = ${findLastStandingCart(tracks, carts)}`)
})
