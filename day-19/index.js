/*
 * Go With The Flow
 *
 * Problem statement: adventofcode.com/2018/day/19
 */

const fs = require('fs')
const assert = require('assert')
const CPU = require('./cpu')

// the disassembled function
const computeMagic = n => {
  let a, b, c, e

  a = 0
  c = 1

  while (true) {
    e = 1

    while (true) {
      b = c * e

      if (b === n) {
        a += c
      }

      e++

      if (e > n) {
        c++

        if (c > n) return a

        break
      }
    }
  }
}

// what the program actually computes
const computeSumOfDivisors = n => {
  let total = 0

  for (let i = 1; i <= n; i++) {
    if (n % i === 0) total += i
  }

  return total
}

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
  const cpu = new CPU()
  cpu.execute(program, ipRegister)
  console.log(`Day 19.1: ${cpu.registers[0]}`)

  // part 2: register 0 will hold the sum of divisors
  assert(computeSumOfDivisors(12345), computeMagic(12345))
  const cpu2 = new CPU([1, 0, 0, 0, 0, 0])
  cpu2.execute(program, ipRegister, 19)
  console.log(`Day 19.2: ${computeSumOfDivisors(cpu2.registers[2])}`)
})