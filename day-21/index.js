/*
 * Chronal Conversion
 *
 * Problem statement: adventofcode.com/2018/day/21
 */

// too high: 16744756

const fs = require('fs')
const assert = require('assert')
const CPU = require('./cpu')

// get assembler code
const readProgram = cb => {
  fs.readFile('program.txt', 'utf8', (_, data) => {
    const program = data.trim().split('\n').map(line => {
      return [line.split(' ')[0], ...line.split(' ').slice(1).map(Number)]
    })

    cb(program)
  })
}

// puzzle solutions
readProgram(program => {
  const ipRegister = 4

  // part 1
  const cpu = new CPU(ipRegister, [0, 0, 0, 0, 0, 0])
  const candidates = cpu.getHaltingValues(program, 100000)
  console.log(`Day 20.1: ${candidates[0]}`)
})
