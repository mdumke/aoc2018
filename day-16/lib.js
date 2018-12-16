/*
 * program execution and helper functions
 *
 */

const fs = require('fs')
const CPU = require('./cpu')

const OPCODES = [
  'addr', 'addi', 'mulr', 'muli', 'banr', 'bani', 'borr', 'bori',
  'setr', 'seti', 'gtir', 'gtri', 'gtrr', 'eqir', 'eqri', 'eqrr'
]

// return cpu-registers after running the given program
const executeProgram = (source, opcodes) => {
  const cpu = new CPU()

  source.forEach(([ opcode, a, b, c ]) => {
    cpu[opcodes[opcode]](a, b, c)
  })

  return [...cpu.registers]
}

// returns opcodes ordered by their number (0 through 15)
const findOpcodeValues = examples => {
  let opcodes = []
  let candidates = getOpcodeCandidates(examples)
  let opcode, distinct

  // assume that at least one opcode is unambiguous each iteration
  while (true) {
    distinct = candidates.findIndex(c => c.length === 1)

    if (distinct === -1) break

    opcode = candidates[distinct][0]
    opcodes[distinct] = opcode

    candidates = candidates.map(c => c.filter(op => op !== opcode))
  }

  return opcodes
}

// returns possible opcode values after evaluating examples
const getOpcodeCandidates = examples => {
  let candidates = Array.from(Array(16), () => [...OPCODES])
  let matches, opcode

  for (let example of examples) {
    matches = findMatchingOpcodes(example)
    opcode = example.instruction[0]

    candidates[opcode] = candidates[opcode]
      .filter(code => matches.includes(code))
  }

  return candidates
}

// returns all opcodes that could have transformed registers as given
const findMatchingOpcodes = ({ before, instruction, after }) => {
  const cpu = new CPU()
  const matches = []

  for (let code of OPCODES) {
    cpu.registers = [...before]
    cpu[code](...instruction.slice(1))

    if (isSameArray(cpu.registers, after)) {
      matches.push(code)
    }
  }

  return matches
}

// returns true if given example matches three or more opcodes
const matchesMultipleOpcodes = example => {
  return findMatchingOpcodes(example).length >= 3
}

// returns true if both arrays contain the same values
const isSameArray = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i])

// returns { before, instruction, after } examples from examples.txt
const getExamples = cb => {
  let examples = []
  let example = {}
  let i = 0

  fs.readFile('examples.txt', 'utf8', (_, data) => {
    const lines = data.trim().split('\n')
    lines.push('\n')

    for (let line of lines) {
      if (i === 3) {
        examples.push({ ...example })
        example = {}
        i = 0
        continue
      }

      let numbers = line
        .match(/(\d+),? (\d+),? (\d+),? (\d+)/)
        .slice(1)
        .map(Number)

      if (i === 0) example.before = [...numbers]
      if (i === 1) example.instruction = [...numbers]
      if (i === 2) example.after = [...numbers]

      i++
    }

    cb(examples)
  })
}

// returns the program as read from program.txt
const getProgram = cb => {
  fs.readFile('program.txt', 'utf8', (_, data) => {
    const source = data.trim().split('\n').map(line =>
      line.match(/(\d+) (\d+) (\d+) (\d+)/).slice(1).map(Number))

    cb(source)
  })
}

module.exports = {
  executeProgram,
  getExamples,
  getProgram,
  findMatchingOpcodes,
  findOpcodeValues,
  matchesMultipleOpcodes
}
