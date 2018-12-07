/*
 * Graph helper class that manages assembly order
 *
 */

class Graph {
  constructor (edges, numTypes) {
    this.n = numTypes
    this.matrix = this.buildAdjacencyMatrix(edges, numTypes)
  }

  // returns a valid processing order as an array of nodes
  findProcessingOrder () {
    let result = []
    let fringe = new Set(this.unblockedNodes())

    while (fringe.size) {
      let current = this.selectNextNode(fringe)

      for (let node = 0; node < this.n; node++) {
        if (this.matrix[current][node]) {
          fringe.add(node)

          // remove blockers from matrix
          this.matrix[current][node] = null
        }
      }

      fringe.delete(current)
      result.push(current)
    }

    return result
  }

  // returns the smallest unblocked item on the fringe
  selectNextNode (fringe) {
    let nodes = Array.from(fringe).sort((a, b) => a - b)

    for (let node of nodes) {
      if (!this.isBlocked(node)) return node
    }

    throw new Error('No unblocked node found')
  }

  // returns true if any previous step is still required
  isBlocked (node) {
    for (let row = 0; row < this.n; row++) {
      if (this.matrix[row][node]) return true
    }

    return false
  }

  // returns a list of all currently unblocked nodes
  unblockedNodes () {
    const unblocked = []

    for (let node = 0; node < this.n; node++) {
      if (!this.isBlocked(node)) unblocked.push(node)
    }

    return unblocked
  }

  // returns an nxn null-matrix with an entry for each edge
  buildAdjacencyMatrix (edges, n) {
    const matrix = Array.from(Array(n), () => Array(n).fill(null))
    edges.forEach(([ i, j ]) => { matrix[i][j] = 1 })

    return matrix
  }
}

module.exports = Graph
