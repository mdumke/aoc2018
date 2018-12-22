/*
 * Mode Maze
 *
 * Problem statement: adventofcode.com/2018/day/22
 */

const { buildCave, findTarget, getErosionLevels, computeRisk } = require('./lib')

const depth = 11739
const target = { col: 11, row: 718 }
const cave = buildCave(target, 750, 750, depth)

console.log(`Day 22.1: ${computeRisk(getErosionLevels(target, 11, 718, depth))}`)

// there is still a bug: 12345, col: 70, row: 27 should be 113, not 111
console.log(`Day 22.2: ${findTarget(cave, target)}`)
