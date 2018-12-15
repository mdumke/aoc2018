/*
 * Board and Unit helper classes
 *
 */

class Board {
  constructor (data, elfStrength = 3) {
    this.field = data.trim().split('\n').map(line => line.split(''))
    this.h = this.field.length
    this.w = this.field[0].length

    this.units = this.createUnits(elfStrength)
    this.numElfs = this.units.filter(u => u.type === 'E').length
    this.numGoblins = this.units.filter(u => u.type === 'G').length
  }

  isFinished () {
    return this.numElfs <= 0 || this.numGoblins <= 0
  }

  // advances the given unit by one step
  move (unit) {
    if (this.isInRange(unit)) return

    let targets = this.getGoalStates(unit)
    let fringe = [{ depth: 0, path: [{ x: unit.x, y: unit.y }]}]
    let visited = {}
    let current, pos, depth

    while (fringe.length) {
      current = fringe[0]
      pos = current.path[0]

      // reaching a potential in-range target
      if (this.isGoalState(pos, targets)) {
        const newPosition = this.selectStep(fringe, targets)
        return this.set(unit, newPosition)
      }

      // do not visit positions multiple times
      if (visited[pos.x] && visited[pos.x][pos.y]) {
        fringe = [...fringe.slice(1)]
        continue
      }

      visited[pos.x] = visited[pos.x] || {}
      visited[pos.x][pos.y] = true

      // add neighbors to explore later
      for (let [ x, y ] of this.getFreeAdjacentPositions(pos)) {
        if (visited[x] && visited[x][y]) continue

        fringe.push({
          depth: current.depth + 1,
          path: [{ x, y }, ...current.path]
        })
      }

      fringe = [...fringe.slice(1)]
    }
  }

  // chooses the best path from available options
  selectStep (fringe, targets) {
    const candidates = fringe
      .filter(item => item.depth === fringe[0].depth)
      .filter(item => this.isGoalState(item.path[0], targets))
      .map(({ path }) => path)

    const target = candidates
      .map(path => path[0])
      .sort(byReadOrder(this.w))[0]

    const shortestPaths = candidates
      .filter(path => path[0].x === target.x && path[0].y === target.y)

    return shortestPaths
      .map(path => path[path.length - 2])
      .sort(byReadOrder(this.w))[0]
  }

  // returns true if given position matches a target
  isGoalState ({ x, y }, targets) {
    return targets[x] && targets[x][y]
  }

  // returns all available in-range positions as a lookup
  getGoalStates (unit) {
    return this.units
      .filter(u => u !== null && u.type === unit.foe)
      .map(u => this.getFreeAdjacentPositions(u))
      .reduce((lookup, positions) => {
        positions.forEach(([ x, y ]) => {
          lookup[x] = lookup[x] || {}
          lookup[x][y] = true
        })
        return lookup
      }, {})
  }

  // returns positions adjacent to x, y that are still available
  getFreeAdjacentPositions ({ x, y }) {
    return [[x - 1, y], [x, y - 1], [x, y + 1], [x + 1, y]].filter(([ i, j ]) => {
      return this.field[i][j] === '.'
    })
  }

  // returns true an adjacent field is occupied by an enemy
  isInRange ({ x, y, foe }) {
    return [[x - 1, y], [x, y - 1], [x, y + 1], [x + 1, y]].some(([ i, j ]) => {
      return this.field[i][j] === foe
    })
  }

  // reduces HP of neighboring enemy with lowest HP
  attack (unit) {
    const foe = this.getFoeToAttack(unit)

    if (!foe) return
    foe.hp -= unit.strength

    if (foe.hp <= 0) {
      this.field[foe.x][foe.y] = '.'
      this.units[this.units.findIndex(u => u === foe)] = null

      if (foe.type === 'E') this.numElfs--
      if (foe.type === 'G') this.numGoblins--
    }
  }

  // returns the weakest neighboring foe, breaking ties in read order
  getFoeToAttack (unit) {
    const foes = this.units
      .filter(Boolean)
      .filter(({ type }) => type === unit.foe)
      .filter(({ x, y }) =>
        (Math.abs(x - unit.x) === 1 && y - unit.y === 0) ||
        (Math.abs(y - unit.y) === 1 && x - unit.x === 0))

    if (!foes.length) return

    const minStrength = foes.reduce((min, f) => Math.min(min, f.hp), Infinity)

    return foes.filter(f => f.hp === minStrength).sort(byReadOrder(this.w))[0]
  }

  // updates units to be in reading order and removes dead units
  sortUnits () {
    this.units = [...this.units.filter(Boolean).sort(byReadOrder(this.w))]
  }

  // moves unit to the new position
  set (unit, { x, y }) {
    this.field[unit.x][unit.y] = '.'
    this.field[x][y] = unit.type
    unit.x = x
    unit.y = y
  }

  // returns current list of elves and gnomes in reading order
  createUnits (elfStrength) {
    let units = []

    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        if (this.field[i][j] === 'G') units.push(new Unit('G', i, j))
        if (this.field[i][j] === 'E') {
          units.push(new Unit('E', i, j, elfStrength))
        }
      }
    }

    return units
  }
}

class Unit {
  constructor (type, x, y, strength = 3, hp = 200) {
    this.type = type
    this.x = x
    this.y = y
    this.strength = strength
    this.hp = hp
    this.foe = type === 'E' ? 'G' : 'E'
  }
}

// sort helper function
const byReadOrder = width => (u1, u2) =>
  (u1.x * width + u1.y) - (u2.x * width + u2.y)

module.exports = { Board }
