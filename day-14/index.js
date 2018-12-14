/*
 * Chocolate Charts
 *
 * Problem statement: adventofcode.com/2018/day/14
 */

const { findPattern, generateRecipes } = require('./lib')

const input = 513401

console.log(`Day 14.1: ${generateRecipes(input)}`)
console.log(`Day 14.2: ${findPattern(input.toString())}`)
