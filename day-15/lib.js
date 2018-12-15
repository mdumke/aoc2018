/*
 * Board and Unit helper classes
 *
 */

class Board {
  constructor (data) {
    this.field = data.trim().split('\n').map(line => line.split(''))
    this.h = this.field.length
    this.w = this.field[0].length

    this.units = this.getUnits()
    this.numElfs = this.units.filter(u => u.type === 'E').length
    this.numGoblins = this.units.filter(u => u.type === 'G').length
  }

  isFinished () {
    return this.numElfs <= 0 || this.numGoblins <= 0
  }

  // advances the given unit by one step
  move (unit) {
    if (unit === null || this.isNextToFoe(unit)) return

    let fringe = this.getAdjacent(unit.x, unit.y, unit.type).map(pos => [pos])
    let explored = {}
    let item, pos

    while (fringe.length) {
      item = fringe.shift()
      pos = item[0]

      // make sure we explore any position only once
      if (explored[pos.x] && explored[pos.x][pos.y]) continue

      explored[pos.x] = explored[pos.x] || {}
      explored[pos.x][pos.y] = true

      // check all neighbours, return if we found a path
      for (let { x, y } of this.getAdjacent(pos.x, pos.y, unit.type)) {
        if (this.field[x][y] === unit.foe) {
          return this.set(unit, item.pop())
        }

        fringe = [...fringe, [{ x, y }, ...item]]
      }
    }
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

    // reading order if guaranteed by initial unit sorting
    return foes.filter(f => f.hp === minStrength)[0]
  }

  // returns a list of available adjacent positions in reading order
  getAdjacent (x, y, type) {
    const positions = [
      { x: Math.max(x - 1, 0), y },
      { x, y: Math.max(y - 1, 0) },
      { x, y: Math.min(y + 1, this.w - 1) },
      { x: Math.min(x + 1, this.h - 1), y }
    ]

    return positions.filter(p =>
      this.field[p.x][p.y] !== '#' && this.field[p.x][p.y] !== type
    )
  }

  // updates units to be in reading order and removes dead units
  sortUnits () {
    const byReadOrder = (u1, u2) =>
      (u1.x * this.w + u1.y) - (u2.x * this.w + u2.y)

    this.units = [...this.units.filter(Boolean).sort(byReadOrder)]
  }

  // moves unit to the new position
  set (unit, { x, y }) {
    this.field[unit.x][unit.y] = '.'
    this.field[x][y] = unit.type
    unit.x = x
    unit.y = y
  }

  // returns true if an enemy is adjacent to the unit
  isNextToFoe (unit) {
    return this.getAdjacent(unit.x, unit.y, unit.type)
      .some(({ x, y }) => this.field[x][y] === unit.foe)
  }

  // returns current list of elves and gnomes in reading order
  getUnits () {
    let units = []

    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        if (this.field[i][j] === 'E') units.push(new Unit('E', i, j))
        if (this.field[i][j] === 'G') units.push(new Unit('G', i, j))
      }
    }

    return units
  }

  display () {
    let field = '\n'
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        field += this.field[i][j] === '#' ? '*' : this.field[i][j]
      }
      field += '\n'
    }
    return field
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

module.exports = { Board }
