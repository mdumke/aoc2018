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

  // fills this.adjacencyList with edge information
  build (regex) {
    let fringe = [{ coord: [0, 0], index: 0, depth: 0 }]
    let current

    while (fringe.length) {
      current = fringe.pop()
//       console.log(current.index)

      for (let neighbor of this.getNeighbors(current, regex)) {
        this.addEdge(current.coord, neighbor.coord)
        fringe.push(neighbor)
      }
    }
  }

  // returns all fields that can be reached according to regex
  getNeighbors ({ coord, index, depth }, regex) {
    if (regex[index + 1] === '$') return []

    if (regex[index + 1] === '(') {
      const neighbors = []
      const options = this.findOptions(index + 2, regex)

      for (let i of options) {
        if (regex[i] === ')') {
          neighbors.push({
            coord: [ ...coord],
            index: i - 1,
            depth: depth + 1
          })
        } else {
          neighbors.push({
            coord: this.step(coord, regex[i]),
            index: i,
            depth: depth + 1
          })
        }
      }

      return neighbors
    }

    if ([')', '|'].includes(regex[index + 1])) {
      const next = this.findContinuation(index, depth, regex)

      return [{
        coord,
        index: next - 1,
        depth: depth - 1
      }]
    }

    return [{
      coord: this.step(coord, regex[index + 1]),
      index: index + 1,
      depth
    }]
  }

  // returns the ids of the next available step (may be a boundary)
  findContinuation (index, depth, regex) {
    let d = depth
    let i = index + 1

    while (d > depth - 1) {
      if (regex[i] === '(') d++
      if (regex[i] === ')') d--

      i++
    }

    return i
  }

  // returns indices of available branches to follow
  findOptions (index, regex) {
    let i = index
    let depth = 0
    let neighbors = [i]

    while (depth >= 0) {
      if (regex[i] === '(') depth++
      if (regex[i] === ')') depth--
      if (depth === 0 && regex[i] === '|') neighbors.push(i + 1)

      i++
    }

    return neighbors
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
