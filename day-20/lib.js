/*
 * parse regex into graph and perform shortest path searches
 *
 */

const { max } = require('../utils')

class Graph {
  constructor (regex) {
    this.adjacencyList = {}
    this.build(regex)
  }

  // ensures encoded node exists
  addNode (node) {
    this.adjacencyList[node] = this.adjacencyList[node] || []
  }

  // stores edge after encoding nodes
  addEdge (node1, node2) {
    const n1 = encode(node1)
    const n2 = encode(node2)

    if (n1 === n2) return

    this.addNode(n1)
    this.addNode(n2)

    if (!this.adjacencyList[n1].includes(n2)) this.adjacencyList[n1].push(n2)
    if (!this.adjacencyList[n2].includes(n1)) this.adjacencyList[n2].push(n1)
  }

  // returns the lenght of the longest shortest path from 0, 0
  findLongestShortestPath () {
    return Object.values(this.computeShortestPaths()).reduce(max)
  }

  // returns the number of shortest paths >= 1000 steps
  countLongShortestPaths () {
    return Object.values(this.computeShortestPaths())
      .filter(v => v >= 1000)
      .length
  }

  // returns shortest path distances from (0, 0) to each point
  computeShortestPaths () {
    const fringe = [{ node: '0,0', depth: 0 }]
    const visited = {}

    let current

    while (fringe.length) {
      current = fringe.shift()

      if (visited[current.node]) continue

      visited[current.node] = current.depth

      for (let node of this.adjacencyList[current.node]) {
        if (!visited[node]) fringe.push({ node, depth: current.depth + 1 })
      }
    }

    return visited
  }

  // fills this.adjacencyList with edge information
  build (regex) {
    let next, char
    let branchingPoints = []
    let position = [0, 0]

    for (char of regex.slice(1)) {
      if (char === '$') continue

      if (char === '(') {
        branchingPoints.push([...position])
        continue
      }

      if (char === ')') {
        position = [...branchingPoints.pop()]
        continue
      }

      if (char === '|') {
        position = [...branchingPoints[branchingPoints.length - 1]]
        continue
      }

      next = this.step(position, char)
      this.addEdge(position, next)

      position = [...next]
    }
  }

  // return coords after one step in given direction
  step ([ x, y ], dir) {
    const diff = {
      'N': [-1, 0],
      'E': [0, 1],
      'S': [1, 0],
      'W': [0, -1]
    }[dir]

    return [x + diff[0], y + diff[1]]
  }
}

const encode = ([ x, y ]) => `${x},${y}`

module.exports = { Graph }
