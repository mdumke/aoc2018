/*
 * Mode Maze
 *
 * Problem statement: adventofcode.com/2018/day/22
 */

const { buildCave, findTarget, getErosionLevels, computeRisk } = require('./lib')

const depth = 11739
const target = { col: 11, row: 718 }

console.log(`Day 22.1: ${computeRisk(getErosionLevels(target, 11, 718, depth))}`)
