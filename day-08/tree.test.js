const { test } = require('tap')
const Tree = require('./tree')

test('constructor', g => {
  g.test('single root node', t => {
    const data = [0, 0]
    const tree = new Tree(data)

    t.same(tree.root, {
      meta: [],
      children: []
    })
    t.end()
  })

  g.test('single root node with metadata', t => {
    const data = [0, 2, 3, 0]
    const tree = new Tree(data)

    t.same(tree.root, {
      meta: [3, 0],
      children: []
    })
    t.end()
  })

  g.test('root with one child', t => {
    const data = [1, 1, 0, 2, -1, -1, -2]
    const tree = new Tree(data)

    t.same(tree.root, {
      meta: [-2],
      children: [{
        meta: [-1, -1],
        children: []
      }]
    })
    t.end()
  })

  g.test('more complex example', t => {
    const data = [
      3, 3, 0, 1, -1, 2, 2,
      0, 2, -2, -3, 0, 1, -4,
      -2, -2, 1, 0, 0, 0, -3, -2, -1
    ]
    const tree = new Tree(data)

    t.same(tree.root, {
      meta: [-3, -2, -1],
      children: [
        { meta: [-1], children: [] },
        {
          meta: [-2, -2],
          children: [
            { meta: [-2, -3], children: [] },
            { meta: [-4], children: [] }
          ]
        },
        {
          meta: [],
          children: [{ meta: [], children: [] }]
        }
      ]
    })
    t.end()
  })

  g.end()
})

test('sumMetadata', g => {
  g.test('single root node with metadata', t => {
    const data = [0, 2, 3, -1]
    const tree = new Tree(data)

    t.equal(tree.sumMetadata(), 2)
    t.end()
  })

  g.test('given example', t => {
    const data = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
    const tree = new Tree(data)

    t.equal(tree.sumMetadata(), 138)
    t.end()
  })

  g.end()
})

test('computeRootValue', g => {
  g.test('single root node with metadata', t => {
    const data = [0, 3, 3, 11, -1]
    const tree = new Tree(data)

    t.equal(tree.computeRootValue(), 13)
    t.end()
  })

  g.test('root with one child', t => {
    const data = [1, 4, 0, 2, -1, -1, 0, 1, 1, 2]
    const tree = new Tree(data)

    t.equal(tree.computeRootValue(), -4)
    t.end()
  })

  g.test('depth 2 tree', t => {
    const data = [1, 1, 1, 2, 0, 1, 2, 1, 1, 1]
    const tree = new Tree(data)

    t.equal(tree.computeRootValue(), 4)
    t.end()
  })

  g.test('given example', t => {
    const data = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
    const tree = new Tree(data)

    t.equal(tree.computeRootValue(), 66)
    t.end()
  })

  g.end()
})
