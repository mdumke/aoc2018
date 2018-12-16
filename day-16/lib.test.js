const { test } = require('tap')
const { findMatchingOpcodes } = require('./lib')

test('findMatchingOpcodes', g => {
  g.test('given example', t => {
    const before = [3, 2, 1, 1]
    const instruction = [9, 2, 1, 2]
    const after = [3, 2, 2, 1]

    t.same(
      findMatchingOpcodes({ before, instruction, after }).sort(),
      ['addi', 'mulr', 'seti']
    )

    t.end()
  })

  g.end()
})
