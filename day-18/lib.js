/*
 * Field class manages resources, helper function
 *
 */

class Field {
  constructor (data) {
    this.matrix = data.trim().split('\n').map(row => row.split(''))
    this.h = this.matrix.length
    this.w = this.matrix[0].length
  }

  // returns amount of wood acres times lumberyards
  get resourceValue () {
    let lumber = 0
    let wood = 0

    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        lumber += Number(this.matrix[i][j] === '#')
        wood += Number(this.matrix[i][j] === '|')
      }
    }

    return lumber * wood
  }

  // computes the state of the field after one minutes
  ticks (n) {
    for (let i = 0; i < n; i++) this.tick()
  }

  // computes the state of the field after one minutes
  tick () {
    const field = Array.from(Array(this.h), () => Array(this.w))

    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        field[i][j] = this.getNextState(i, j)
      }
    }

    this.matrix = field
  }

  // returns the value of the given field in the next minute
  getNextState (i, j) {
    const adj = this.getAdjacent(i, j)

    switch (this.matrix[i][j]) {
      case '.': return adj.filter(v => v === '|').length >= 3 ? '|' : '.'
      case '|': return adj.filter(v => v === '#').length >= 3 ? '#' : '|'
      case '#':
        return (
          adj.filter(v => v === '#').length >= 1 &&
          adj.filter(v => v === '|').length >= 1
        ) ? '#' : '.'
      default:
        throw new Error('unknown state')
    }
  }

  // returns the values of all fields adjacent to given position
  getAdjacent (i, j) {
    const positions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ]
    const adj = []

    for (let [ x, y ] of positions) {
      if (this.matrix[i + x] && this.matrix[i + x][j + y]) {
        adj.push(this.matrix[i + x][j + y])
      }
    }

    return adj
  }

  display () {
    let show = ''

    this.matrix.forEach(row => {
      show += row.join('')
      show += '\n'
    })

    console.log(show)
  }
}

// returns first occurence of a repeating pattern and its cycle length
const findPeriod = data => {
  const field = new Field(data)
  let memory = {}
  let hash

  // keep track of which fields have occured so far
  for (let i = 0; true; i++) {
    field.tick()
    hash = field.matrix.map(row => row.join('')).join('')

    if (memory[hash]) {
      return { first: memory[hash], length: i - memory[hash] }
    }

    memory[hash] = i
  }
}

module.exports = { Field, findPeriod }
