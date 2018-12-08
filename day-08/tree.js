class Tree {
  constructor (data) {
    this.root = data.length ? this.build(data) : null
  }

  sumMetadata () {
    if (!this.root) return 0

    const traverse = node => {
      total += node.meta.reduce(sum)
      node.children.forEach(traverse)
    }

    let total = 0
    traverse(this.root)

    return total
  }

  build (data) {
    let nChild = data.shift()
    let nMeta = data.shift()
    let children = []
    let meta = []

    for (let i = 0; i < nChild; i++) children.push(this.build(data))
    for (let i = 0; i < nMeta; i++) meta.push(data.shift())

    return new Node(meta, children)
  }
}

class Node {
  constructor (meta, children) {
    this.meta = [...meta]
    this.children = [...children]
  }
}

const sum = (memo, value) => memo + value

module.exports = Tree
