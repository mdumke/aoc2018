/*
 * Battlefield state management and battle simulation
 *
 */

class Field {
  constructor (groups) {
    this.groups = groups.reduce((acc, group, i) => {
      acc[i] = group
      return acc
    }, {})

    this.selectionOrder = null
    this.attackOrder = null
  }

  // returns the remaining unit-counts after the battle
  simulateBattle () {
    let counts = this.getUnitCounts()

    while (counts.immune !== 0 && counts.infection !== 0) {
      this.updateSelectionOrder()
      this.selectTargets()
      this.updateAttackOrder()
      this.attack()
      this.cleanup()

      counts = this.getUnitCounts()
    }

    return counts
  }

  // returns the remaining number of units in each party
  getUnitCounts () {
    let immune = 0
    let infection = 0
    let group

    for (let id in this.groups) {
      group = this.groups[id]

      if (group.party === 'Infection') {
        infection += group.units
      } else {
        immune += group.units
      }
    }

    return { immune, infection }
  }

  // performs one round of attacks
  attack () {
    let group

    for (let id of this.attackOrder) {
      group = this.groups[id]

      if (group.target) {
        group.attack(this.groups[group.target])
      }
    }
  }

  // removes prepares the field for the next round
  cleanup () {
    for (let id in this.groups) {
      if (this.groups[id].units === 0) {
        delete this.groups[id]
      }
    }
  }

  // sets 0 or 1 targets for each group to attack
  selectTargets () {
    let selectedAsTarget = {}

    for (let id1 of this.selectionOrder) {
      let group1 = this.groups[id1]

      let candidates = []
      let maxDamage = 0
      let damage

      for (let id2 of Object.keys(this.groups)) {
        let group2 = this.groups[id2]

        if (group1.party === group2.party) continue
        if (selectedAsTarget[id2]) continue

        damage = group1.computeDamageTo(group2)

        if (damage > maxDamage) {
          maxDamage = damage
          candidates = [id2]
        } else if (damage && damage === maxDamage) {
          candidates.push(id2)
        }
      }

      candidates = candidates.sort((c1, c2) => {
        return this.groups[c2].effectivePower !== this.groups[c1].effectivePower
          ? this.groups[c2].effectivePower - this.groups[c1].effectivePower
          : this.groups[c2].initiative - this.groups[c1].initiative
      })

      if (candidates.length) {
        group1.target = candidates[0]
        selectedAsTarget[candidates[0]] = true
      } else {
        group1.target = null
      }
    }
  }

  // sets the order in which groups choose their targets
  updateSelectionOrder () {
    this.selectionOrder = Object.keys(this.groups).sort((id1, id2) => {
      let group1 = this.groups[id1]
      let group2 = this.groups[id2]

      return group2.effectivePower !== group1.effectivePower
        ? group2.effectivePower - group1.effectivePower
        : group2.initiative - group1.initiative
    })
  }

  // sets the order in which groups attack
  updateAttackOrder () {
    this.attackOrder = Object.keys(this.groups).sort((id1, id2) => {
      return this.groups[id2].initiative - this.groups[id1].initiative
    })
  }
}

module.exports = Field
