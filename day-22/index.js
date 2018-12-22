/*
 * Mode Maze
 *
 * Problem statement: adventofcode.com/2018/day/22
 */

const { getErosionLevels, computeRisk } = require('./lib')

const depth = 11739
const target = { row: 11, col: 718 }

console.log(`Day 22.1: ${computeRisk(getErosionLevels(target, depth))}`)
