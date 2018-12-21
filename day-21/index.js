/*
 * Chronal Conversion
 *
 * Problem statement: adventofcode.com/2018/day/21
 */

const fs = require('fs')
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
  const cpu = new CPU(ipRegister)

  // brute force: this may take a minute to run
  const haltingValues = cpu.getHaltingValues(program)

  console.log(`Day 21.1: ${haltingValues[0]}`)
  console.log(`Day 21.2: ${haltingValues[haltingValues.length - 1]}`)
})
