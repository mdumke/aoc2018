/*
 * Cube helper class keeps track of how many bots are in range of an area
 *
 */

const { manhattan } = require('../utils')

class Cube {
  constructor (center, range) {
    this.x = center[0]
    this.y = center[1]
    this.z = center[2]
    this.range = range
  }

  // returns number of bots that are inside the cube or in range
  countBotsInRange (bots) {
    return bots.reduce((sum, bot) => {
      return sum + Number(this.isInRange(bot))
    }, 0)
  }

  // returns true if bot is inside the cube or touches the boundaries
  isInRange (bot) {
    if (this.includes(bot)) return true

    const comparisonPoint = { ...bot }

    for (let dim of ['x', 'y', 'z']) {
      if (this[dim] - this.range > bot[dim] || this[dim] + this.range < bot[dim]) {
        comparisonPoint[dim] = bot[dim] < this[dim]
          ? this[dim] - this.range
          : this[dim] + this.range
      }
    }

    return manhattan(bot, comparisonPoint) <= bot.range
  }

  // returns true if bot position is within the cube
  includes (bot) {
    return (
      bot.x > this.x - this.range && bot.x < this.x + this.range &&
      bot.y > this.y - this.range && bot.y < this.y + this.range &&
      bot.z > this.z - this.range && bot.z < this.z + this.range
    )
  }

  // returns 8 child cubes from splitting this one
  split () {
    const directions = this.getChildDirections()

    if (this.range === 1) {
      return this.getAllDirections()
        .map(([ dx, dy, dz ]) => [ this.x + dx, this.y + dy, this.z + dz ])
        .map(center => new Cube(center, 0))
    }

    return directions
      .map(coords => coords.map(c => c * Math.floor(this.range / 2)))
      .map(([ dx, dy, dz ]) => [ this.x + dx, this.y + dy, this.z + dz ])
      .map(center => {
        return new Cube(center, Math.floor(this.range / 2))
      })
  }

  // returns 27 relative positions of the last options
  getAllDirections () {
    const directions = []

    for (let x of [1, 0, -1]) {
      for (let y of [1, 0, -1]) {
        for (let z of [1, 0, -1]) {
          directions.push([x, y, z])
        }
      }
    }

    return directions
  }

  // returns relative positions of 8 children after splitting
  getChildDirections () {
    const directions = []

    for (let x of [1, -1]) {
      for (let y of [1, -1]) {
        for (let z of [1, -1]) {
          directions.push([x, y, z])
        }
      }
    }

    return directions
  }
}

module.exports = Cube
