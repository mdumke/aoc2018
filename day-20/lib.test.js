const { test } = require('tap')
const { Graph } = require('./lib')
const { sum } = require('../utils')

test('Graph constructor', g => {
  g.test('NENWS', t => {
    const graph = new Graph('^NENWS$')

    t.ok(graph.adjacencyList['-1,1'].includes('-2,1'))
    t.ok(graph.adjacencyList['-1,1'].includes('-1,0'))
    t.ok(graph.adjacencyList['-1,0'].includes('-1,1'))

    t.equal(
      Object.values(graph.adjacencyList).map(v => v.length).reduce(sum),
      10
    )
    t.end()
  })

  g.test('N(E|W)', t => {
    const graph = new Graph('^N(E|W)$')

    t.equal(
      Object.values(graph.adjacencyList).map(v => v.length).reduce(sum),
      6
    )

    t.end()
  })

  g.test('N(E|W)N', t => {
    const graph = new Graph('^N(E|W)N$')

    t.equal(
      Object.values(graph.adjacencyList).map(v => v.length).reduce(sum),
      10
    )

    t.end()
  })

  g.test('N(E|W(S|W))N', t => {
    const graph = new Graph('^N(E|W(S|W))N$')

    t.equal(
      Object.values(graph.adjacencyList).map(v => v.length).reduce(sum),
      14
    )

    t.end()
  })

  g.test('N(EE|W(N|W)|NN)', t => {
    const graph = new Graph('^N(EE|W(N|W)|NN)$')

    t.equal(
      Object.values(graph.adjacencyList).map(v => v.length).reduce(sum),
      16
    )

    t.end()
  })

  g.test('N(EW|)N', t => {
    const graph = new Graph('^N(EW|)N$')

    t.equal(
      Object.values(graph.adjacencyList).map(v => v.length).reduce(sum),
      6
    )

    t.end()
  })

  g.test('given example 1', t => {
    const graph = new Graph('^ENWWW(NEEE|SSE(EE|N))$')

    t.equal(
      Object.values(graph.adjacencyList).map(v => v.length).reduce(sum),
      30
    )

    t.end()
  })

  g.test('given example 2', t => {
    const graph = new Graph('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$')

    t.equal(
      Object.values(graph.adjacencyList).map(v => v.length).reduce(sum),
      48
    )

    t.end()
  })

  g.test('parsing other given examples', t => {
    const graph1 = new Graph('^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$')
    const graph2 = new Graph('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$')

    t.ok(graph1)
    t.ok(graph2)
    t.end()
  })

  g.end()
})
