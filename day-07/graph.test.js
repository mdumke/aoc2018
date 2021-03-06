const { test } = require('tap')
const Graph = require('./graph')

test('unblockedNodes', g => {
  g.test('single edge graph', t => {
    const graph = new Graph([[0, 1]], 2)
    t.same(graph.unblockedNodes(), [0])
    t.end()
  })

  g.test('more complex graph', t => {
    const graph = new Graph([[1, 0], [2, 0], [1, 2]], 3)
    t.same(graph.unblockedNodes(), [1])
    t.end()
  })

  g.end()
})

test('findProcessingOrder', g => {
  g.test('single edge graph', t => {
    const graph = new Graph([[0, 1]], 2)
    t.same(graph.findProcessingOrder(), [0, 1])
    t.end()
  })

  g.test('two branches', t => {
    const graph = new Graph([[0, 1], [0, 2], [1, 3], [2, 3]], 4)
    t.same(graph.findProcessingOrder(), [0, 1, 2, 3])
    t.end()
  })

  g.test('two starting points', t => {
    const graph = new Graph([[1, 0], [2, 0]], 3)
    t.same(graph.findProcessingOrder(), [1, 2, 0])
    t.end()
  })

  g.test('two branches with scrambled order', t => {
    const graph = new Graph([[1, 0], [0, 2], [3, 2], [1, 3]], 4)
    t.same(graph.findProcessingOrder(), [1, 0, 3, 2])
    t.end()
  })

  g.test('more complex graph', t => {
    const graph = new Graph([
      [0, 3], [1, 5], [2, 0], [4, 1], [4, 2], [5, 3]
    ], 6)
    t.same(graph.findProcessingOrder(), [4, 1, 2, 0, 5, 3])
    t.end()
  })

  g.test('given example', t => {
    const graph = new Graph([
      [0, 1], [0, 3], [1, 4], [2, 0], [2, 5], [3, 4], [5, 4]
    ], 6)
    t.same(graph.findProcessingOrder(), [2, 0, 1, 3, 5, 4])
    t.end()
  })

  g.end()
})

test('assemble', g => {
  g.test('single edge, one worker', t => {
    const graph = new Graph([[0, 1]], 2)
    t.same(graph.assemble(1, () => 1), 2)
    t.end()
  })

  g.test('two edges, one worker', t => {
    const graph = new Graph([[0, 1], [2, 1]], 3)
    t.same(graph.assemble(1, () => 1), 3)
    t.end()
  })

  g.test('two edges, two workers', t => {
    const graph = new Graph([[0, 1], [2, 1]], 3)
    t.same(graph.assemble(2, () => 1), 2)
    t.end()
  })

  g.test('linear job-chain, one worker', t => {
    const graph = new Graph([[0, 1], [2, 0], [1, 3]], 4)
    t.same(graph.assemble(1, id => id + 1), 10)
    t.end()
  })

  g.test('linear job-chain, three workers', t => {
    const graph = new Graph([[0, 1], [2, 0], [1, 3]], 4)
    t.same(graph.assemble(3, id => id + 1), 10)
    t.end()
  })

  g.test('more complex setup, two workers', t => {
    const graph = new Graph([
      [3, 0], [1, 0], [1, 2], [5, 2], [0, 4], [2, 4]
    ], 6)
    t.same(graph.assemble(2, id => id + 1), 16)
    t.end()
  })

  g.test('more complex setup, three workers', t => {
    const graph = new Graph([
      [3, 0], [1, 0], [1, 2], [5, 2], [0, 4], [2, 4]
    ], 6)
    t.same(graph.assemble(3, id => id + 1), 14)
    t.end()
  })

  g.test('given example', t => {
    const graph = new Graph([
      [0, 1], [0, 3], [1, 4], [2, 0], [2, 5], [3, 4], [5, 4]
    ], 6)
    t.same(graph.assemble(2, id => id + 1), 15)
    t.end()
  })

  g.end()
})
