/*
 * Chronal Classification
 *
 * Problem statement: adventofcode.com/2018/day/16
 */

const {
  executeProgram,
  getExamples,
  getProgram,
  findOpcodeValues,
  matchesMultipleOpcodes
} = require('./lib')

getExamples(examples => {
  console.log(`Day 16.1: ${examples.filter(matchesMultipleOpcodes).length}`)

  getProgram(source => {
    const registers = executeProgram(source, findOpcodeValues(examples))
    console.log(`Day 16.2: ${registers[0]}`)
  })
})
