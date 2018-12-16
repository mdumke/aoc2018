/*
 * Instruction set architecture processing opcodes
 *
 */

class CPU {
  constructor (values = [0, 0, 0, 0]) {
    this.registers = [...values]
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
