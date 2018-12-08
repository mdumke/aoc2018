/*
 * Tree class builds tree according to spec and performs computations on it
 *
 */

class Tree {
  constructor (data) {
    this.root = this.buildNode(data)
  }

  sumMetadata () {
    const traverse = node => {
      total += node.sumMetadata()
      node.children.forEach(traverse)
    }

    let total = 0
    traverse(this.root)
    return total
  }

  computeRootValue () {
    return this.computeValue(this.root)
  }

  computeValue (node) {
    if (!node.children.length) return node.sumMetadata()
    const values = node.children.map(this.computeValue.bind(this))

    return node.meta.reduce((sum, i) => {
      return sum + (i > 0 && i <= values.length ? values[i - 1] : 0)
    }, 0)
  }

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

  sumMetadata () {
    return this.meta.reduce((memo, v) => memo + v, 0)
  }
}

module.exports = Tree
