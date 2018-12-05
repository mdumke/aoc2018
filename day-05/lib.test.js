const { test } = require('tap')
const { computeReaction } = require('./lib')

test('computeReaction', g => {
  g.test('a', t => {
    t.equal(computeReaction('a'), 'a')
    t.end()
  })

  g.test('ab', t => {
    t.equal(computeReaction('ab'), 'ab')
    t.end()
  })

  g.test('aA', t => {
    t.equal(computeReaction('aA'), '')
    t.end()
  })

  g.test('abBA', t => {
    t.equal(computeReaction('abBA'), '')
    t.end()
  })

  g.test('abBc', t => {
    t.equal(computeReaction('abBc'), 'ac')
    t.end()
  })

  g.test('abcd', t => {
    t.equal(computeReaction('abcd'), 'abcd')
    t.end()
  })

  g.test('abcCBA', t => {
    t.equal(computeReaction('abcCBA'), '')
    t.end()
  })

  g.test('abcCBX', t => {
    t.equal(computeReaction('abcCBX'), 'aX')
    t.end()
  })

  g.test('abcdDCBA', t => {
    t.equal(computeReaction('abcdDCBA'), '')
    t.end()
  })

  g.test('xabcCBA', t => {
    t.equal(computeReaction('xabcCBA'), 'x')
    t.end()
  })

  g.test('cAbdDBaCx', t => {
    t.equal(computeReaction('cAbdDBaCx'), 'x')
    t.end()
  })

  g.test('cAbdDBaCx', t => {
    t.equal(computeReaction('cAbdDBaCx'), 'x')
    t.end()
  })

  g.test('aAcbB', t => {
    t.equal(computeReaction('aAcbB'), 'c')
    t.end()
  })

  g.test('aAbB', t => {
    t.equal(computeReaction('aAbB'), '')
    t.end()
  })

  g.test('given example', t => {
    t.equal(computeReaction('dabAcCaCBAcCcaDA'), 'dabCBAcaDA')
    t.end()
  })

  g.test('complex example', t => {
    t.equal(
      computeReaction('MmCcinNpPIuIMmXxMDQqSsdRrfFEJVvjerRMvOoVmFbAaBnNfCctTPpwWvJjMmDdctTTtRVvyYrzZtBmMNnbGgcCJJJjOooOpPfFHhjVeEvAaSsAajyYQhHqxHhXeETTQqttTLlEvVoOedDzZaAIiESseHsSDdPpXhHxhFVvSsQqfCbBmoHaAhIiOrRVvMDBbFLlfPhHdDtTpdJ'),
      'uIMvJ'
    )
    t.end()
  })

  g.end()
})
