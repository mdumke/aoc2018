/*
 * Tree class builds tree according to spec and performs computations on it
 *
 */

const { sum, countByValue } = require('../utils')

class Tree {
  constructor (data) {
    this.root = this.buildNode(data)
  }

  // returns the sum of all metadata entries
  sumMetadata () {
    const traverse = node => node.sumMetadata() + node
      .children
      .map(traverse)
      .reduce(sum, 0)

    return traverse(this.root)
  }

  // returns value at the root according to problem spec
  computeRootValue () {
    const traverse = node => {
      if (!node.children.length) return node.sumMetadata()

      return node.children.map(traverse).reduce((sum, val, i) => {
        return sum + val * node.metaValueCount(i + 1)
      }, 0)
    }

    return traverse(this.root)
  }

  // constructs (nested) nodes
  buildNode (data) {
    let nChild = data.shift()
    let nMeta = data.shift()
    let children = []
    let meta = []

    for (let i = 0; i < nChild; i++) children.push(this.buildNode(data))
    for (let i = 0; i < nMeta; i++) meta.push(data.shift())

    return new Node(meta, children)
  }
}

class Node {
  constructor (meta, children) {
    this.meta = [...meta]
    this.children = [...children]
  }

  metaValueCount (value) {
    return this.meta.reduce(countByValue, {})[value] || 0
  }

  sumMetadata () {
    return this.meta.reduce(sum, 0)
  }
}

module.exports = Tree
