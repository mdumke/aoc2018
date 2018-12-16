const { test } = require('tap')
const CPU = require('./cpu')

test('opcodes', g => {
  g.test('addr 1', t => {
    const cpu = new CPU([3, 2, 1, 1])
    cpu.addr(0, 1, 2)
    t.same(cpu.registers, [3, 2, 5, 1])
    t.end()
  })

  g.test('addi 1', t => {
    const cpu = new CPU([3, 2, 1, 1])
    cpu.addi(2, 1, 2)
    t.same(cpu.registers, [3, 2, 2, 1])
    t.end()
  })

  g.test('mulr 1', t => {
    const cpu = new CPU([3, 1, 3, 7])
    cpu.mulr(0, 2, 3)
    t.same(cpu.registers, [3, 1, 3, 9])
    t.end()
  })

  g.test('muli 1', t => {
    const cpu = new CPU([3, 1, 5, 4])
    cpu.muli(3, 2, 0)
    t.same(cpu.registers, [8, 1, 5, 4])
    t.end()
  })

  g.test('banr 1', t => {
    const cpu = new CPU([13, 6, 0, 0])
    cpu.banr(0, 1, 3)
    t.same(cpu.registers, [13, 6, 0, 4])
    t.end()
  })

  g.test('bani 1', t => {
    const cpu = new CPU([1, 7, 2, 1])
    cpu.bani(1, 5, 2)
    t.same(cpu.registers, [1, 7, 5, 1])
    t.end()
  })

  g.test('borr 1', t => {
    const cpu = new CPU([1, 6, 2, 1])
    cpu.borr(1, 0, 3)
    t.same(cpu.registers, [1, 6, 2, 7])
    t.end()
  })

  g.test('bori 1', t => {
    const cpu = new CPU([5, 0, 0, 0])
    cpu.bori(0, 10, 0)
    t.same(cpu.registers, [15, 0, 0, 0])
    t.end()
  })

  g.test('setr 1', t => {
    const cpu = new CPU([5, 0, 0, 0])
    cpu.setr(0, 0, 2)
    t.same(cpu.registers, [5, 0, 5, 0])
    t.end()
  })

  g.test('seti 1', t => {
    const cpu = new CPU([0, 3, 0, 0])
    cpu.seti(1, 5, 0)
    t.same(cpu.registers, [1, 3, 0, 0])
    t.end()
  })

  g.test('gtir 1', t => {
    const cpu = new CPU([1, 3, 1, 2])
    cpu.gtir(1, 2, 3)
    t.same(cpu.registers, [1, 3, 1, 0])
    t.end()
  })

  g.test('gtri 1', t => {
    const cpu = new CPU([1, 3, 1, 2])
    cpu.gtri(1, 2, 3)
    t.same(cpu.registers, [1, 3, 1, 1])
    t.end()
  })

  g.test('gtrr 1', t => {
    const cpu = new CPU([1, 3, 3, 2])
    cpu.gtrr(2, 1, 3)
    t.same(cpu.registers, [1, 3, 3, 0])
    t.end()
  })

  g.test('eqir 1', t => {
    const cpu = new CPU([1, 2, 3, 2])
    cpu.eqir(2, 1, 3)
    t.same(cpu.registers, [1, 2, 3, 1])
    t.end()
  })

  g.test('eqri 1', t => {
    const cpu = new CPU([1, 2, 3, 2])
    cpu.eqri(2, 1, 1)
    t.same(cpu.registers, [1, 0, 3, 2])
    t.end()
  })

  g.test('eqrr 1', t => {
    const cpu = new CPU([1, 2, 2, 2])
    cpu.eqrr(2, 1, 1)
    t.same(cpu.registers, [1, 1, 2, 2])
    t.end()
  })

  g.end()
})
