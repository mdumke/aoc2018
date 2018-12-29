/*
 * Group of immune system or infection units
 *
 */

class Group {
  constructor (options) {
    this.party = options.party
    this.units = Number(options.units)
    this.hp = Number(options.hp)
    this.damage = Number(options.damage)
    this.attackType = options.attackType
    this.initiative = Number(options.initiative)
    this.immunities = [...options.immunities]
    this.weaknesses = [...options.weaknesses]
    this.target = null
  }

  get effectivePower () {
    return this.units * this.damage
  }

  // reduces target's units if possible (assumes and mutates target)
  attack (target) {
    const damage = this.computeDamageTo(target)
    const unitsToRemove = Math.floor(damage / target.hp)

    target.units = Math.max(target.units - unitsToRemove, 0)
  }

  computeDamageTo (opponent) {
    return this.effectivePower *
      (opponent.immunities.includes(this.attackType) ? 0 : 1) *
      (opponent.weaknesses.includes(this.attackType) ? 2 : 1)
  }
}

module.exports = Group
