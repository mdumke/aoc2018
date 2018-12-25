const { test } = require('tap')
const { assembleConstellations } = require('./lib')

test('assembleConstellations', g => {
  g.test('given example 1', t => {
    const coords = [
      '0,0,0,0',
      '3,0,0,0',
      '0,3,0,0',
      '0,0,3,0',
      '0,0,0,3',
      '0,0,0,6',
      '9,0,0,0',
      '12,0,0,0'
    ].map(l => l.split(',').map(Number))

    t.equal(assembleConstellations(coords).length, 2)
    t.end()
  })

  g.test('given example 2', t => {
    const coords = [
      '0,0,0,0',
      '3,0,0,0',
      '0,3,0,0',
      '0,0,3,0',
      '0,0,0,3',
      '0,0,0,6',
      '9,0,0,0',
      '12,0,0,0',
      '6,0,0,0'
    ].map(l => l.split(',').map(Number))

    t.equal(assembleConstellations(coords).length, 1)
    t.end()
  })

  g.test('given example 3', t => {
    const coords = [
      '-1,2,2,0',
      '0,0,2,-2',
      '0,0,0,-2',
      '-1,2,0,0',
      '-2,-2,-2,2',
      '3,0,2,-1',
      '-1,3,2,2',
      '-1,0,-1,0',
      '0,2,1,-2',
      '3,0,0,0'
    ].map(l => l.split(',').map(Number))

    t.equal(assembleConstellations(coords).length, 4)
    t.end()
  })

  g.end()
})
