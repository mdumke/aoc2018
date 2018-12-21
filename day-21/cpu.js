/*
 * Instruction set architecture processing opcodes
 *
 */

class CPU {
  constructor (ipRegister, registers = [0, 0, 0, 0, 0, 0]) {
    this.registers = [...registers]
    this.ipRegister = ipRegister
  }

  // returns all values for which instruction 28 would end the program
  getHaltingValues (program) {
    let values = []
    let lookup = {}

    let ip = 0

    while (program[ip]) {
      if (ip === 28) {
        if (lookup[this.registers[3]]) return values

        values.push(this.registers[3])
        lookup[this.registers[3]] = true
      }

      ip = this.tick(program[ip], ip)
      ip++
    }

    return values
  }

  // runs the given instructions
  execute (program, ticks = -1) {
    let ip = 0

    while (ticks-- && program[ip]) {
      ip = this.tick(program[ip], ip)
      ip++
    }
  }

  // runs a single instruction, returns the (unincremented) ip-value
  tick ([ opcode, a, b, c ], ip) {
    this.registers[this.ipRegister] = ip
    this[opcode](a, b, c)

    return this.registers[this.ipRegister]
  }

  addr (a, b, c) { this.registers[c] = this.registers[a] + this.registers[b] }
  addi (a, b, c) { this.registers[c] = this.registers[a] + b }
  mulr (a, b, c) { this.registers[c] = this.registers[a] * this.registers[b] }
  muli (a, b, c) { this.registers[c] = this.registers[a] * b }
  banr (a, b, c) { this.registers[c] = this.registers[a] & this.registers[b] }
  bani (a, b, c) { this.registers[c] = this.registers[a] & b }
  borr (a, b, c) { this.registers[c] = this.registers[a] | this.registers[b] }
  bori (a, b, c) { this.registers[c] = this.registers[a] | b }
  setr (a, b, c) { this.registers[c] = this.registers[a] }
  seti (a, b, c) { this.registers[c] = a }
  gtir (a, b, c) { this.registers[c] = Number(a > this.registers[b]) }
  gtri (a, b, c) { this.registers[c] = Number(this.registers[a] > b) }
  gtrr (a, b, c) { this.registers[c] = Number(this.registers[a] > this.registers[b]) }
  eqir (a, b, c) { this.registers[c] = Number(a === this.registers[b]) }
  eqri (a, b, c) { this.registers[c] = Number(this.registers[a] === b) }
  eqrr (a, b, c) { this.registers[c] = Number(this.registers[a] === this.registers[b]) }
}

module.exports = CPU
