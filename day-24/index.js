/*
 * Immune System Simulator 20XX
 *
 */

const { findUnitsAfterBattle, getInput } = require('./lib')

const groups = getInput('input.txt')

console.log(`Day 24.1: ${findUnitsAfterBattle(groups).infection}`)
