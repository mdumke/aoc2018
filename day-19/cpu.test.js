const { test } = require('tap')
const CPU = require('./cpu')

test('example', g => {
  const cpu = new CPU()

  const instructions = [
    ['seti', 5, 0, 1],
    ['seti', 6, 0, 2],
    ['addi', 0, 1, 0],
    ['addr', 1, 2, 3],
    ['setr', 1, 0, 0],
    ['seti', 8, 0, 4],
    ['seti', 9, 0, 5]
  ]

  cpu.execute(instructions, 0)
  g.same(cpu.registers, [6, 5, 6, 0, 0, 9])
  g.end()
})
