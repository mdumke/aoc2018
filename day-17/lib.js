class Field {
  constructor (xs, ys, xOffset) {
    this.well = { x: 500 - xOffset + 1, y: 0 }
    this.matrix = this.buildMatrix(xs, ys, xOffset)
  }

  // places water of type ~ or | onto the field, starting from the spring
  fill () {
    let fringe = [[{ ...this.well }]]
    let current

    let i = 10

    while (i++) {
      current = fringe.pop()

      if (!current.length) break

      let { x, y } = current[0]

      // backtrack if max depth is reached
      if (y + 1 === this.matrix.length) {
        this.matrix[y][x] = '|'
        fringe.push([...current.slice(1)])
        continue
      }

      // backtrack if already visited
      if (this.matrix[y + 1][x] === '|') {
        this.matrix[y][x] = '|'
        fringe.push([...current.slice(1)])
        continue
      }
      if (this.matrix[y][x] === '~') {
        fringe.push([...current.slice(1)])
        continue
      }

      // continue flowing down if possible
      if (this.matrix[y + 1][x] === '.') {
        this.matrix[y][x] = '|'
        fringe.push([{ x, y: y + 1 }, ...current])
        continue
      }

      // try to fill the current reservoir-layer
      let left = this.findBoundary(x, y, 'left')
      let right = this.findBoundary(x, y, 'right')

      if (left.isClay && right.isClay) {
        this.fillBetween(left, right, '~')
        fringe.push([...current.slice(1)])
        continue
      }

      // continue flow left and right
      this.fillBetween(left, right, '|')

      if (!left.isClay && left.x < x && this.matrix[y][left.x] !== '|') {
        fringe.push([{ x: left.x, y: left.y }, ...current])
      } else if (!right.isClay && right.x > x && this.matrix[y][right.x] !== '|') {
        fringe.push([{ x: right.x, y: right.y }, ...current])
      } else {
        fringe.push([...current.slice(1)])
      }
    }
  }

  // returns { x, y, isClay } for the next decision point
  findBoundary (x, y, dir) {
    if (dir === 'left' && x === 0) return { x, y }
    if (dir === 'right' && x === this.matrix[0].length) return { x, y }

    x = dir === 'left' ? x - 1 : x + 1

    while (true) {
      if (this.matrix[y][x] === '#') return { x, y, isClay: true }
      if (['.', '|'].includes(this.matrix[y + 1][x])) return { x, y }

      x = dir === 'left' ? x - 1 : x + 1
    }
  }

  // adds given symbol in the current row between given positions
  fillBetween (left, right, symbol) {
    for (let col = left.x + 1; col < right.x; col++) {
      this.matrix[left.y][col] = symbol
    }
  }

  // returns sand and clay matrix from x and y scan-inputs
  buildMatrix (xs, ys) {
    const { xMax, yMax } = getDimensions(xs, ys)

    const matrix = Array.from(Array(yMax + 1), () => {
      return Array(xMax + 3).fill('.')
    })

    matrix[this.well.y][this.well.x] = '+'

    for (let [ col, y1, y2 ] of xs) {
      for (let row = y1; row <= y2; row++) matrix[row][col + 1] = '#'
    }

    for (let [ row, x1, x2 ] of ys) {
      for (let col = x1; col <= x2; col++) matrix[row][col + 1] = '#'
    }

    return matrix
  }

  countWater () {
    let sum = 0

    for (let row = 1; row < this.matrix.length - 1; row++) {
      for (let col = 0; col < this.matrix[0].length; col++) {
        sum += Number(['|', '~'].includes(this.matrix[row][col]))
      }
    }

    return sum
  }

  display () {
    let show = '\n'

    this.matrix.forEach(row => {
      show += row.join('')
      show += '\n'
    })

    console.log(show)
  }
}

// returns min and max x and y values without offset
const parseInput = scan => {
  const lines = scan.trim().split('\n')

  const xs = []
  const ys = []

  for (let line of lines) {
    line[0] === 'x'
      ? xs.push(line.match(/x=(\d+), y=(\d+)\.\.(\d+)$/).slice(1).map(Number))
      : ys.push(line.match(/y=(\d+), x=(\d+)\.\.(\d+)$/).slice(1).map(Number))
  }

  return removeOffset(xs, ys)
}

// reduces x-values to start at 0
const removeOffset = (xs, ys) => {
  const { xMin } = getDimensions(xs, ys)

  const newXs = xs.map(([ x, y1, y2 ]) => [x - xMin, y1, y2])
  const newYs = ys.map(([ y, x1, x2 ]) => [y, x1 - xMin, x2 - xMin])

  return [newXs, newYs, xMin]
}

// returns max and min values in both dimensions
const getDimensions = (xs, ys) => ({
  xMin: Math.min(...xs.map(([ x ]) => x), ...ys.map(([ y, x1, x2 ]) => x1)),
  xMax: Math.max(...xs.map(([ x ]) => x), ...ys.map(([ y, x1, x2 ]) => x2)),
  yMin: Math.min(...ys.map(([ y ]) => y), ...xs.map(([ x, y1, y2 ]) => y1)),
  yMax: Math.max(...ys.map(([ y ]) => y), ...xs.map(([ x, y1, y2 ]) => y2))
})

module.exports = {
  Field,
  parseInput
}
