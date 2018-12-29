/*
 * Run battle simulation, and helper functions
 *
 */

const fs = require('fs')
const Field = require('./field')
const Group = require('./group')

// returns the number of remaining units after battle
const findUnitsAfterBattle = groups => {
  const field1 = new Field(groups)
  const counts = field1.simulateBattle()

  return counts
}

const getInput = filename => {
  const lines = fs.readFileSync(filename, 'utf8').split('\n').filter(Boolean)

  let groups = []
  let party = 'Immune system'

  for (let line of lines) {
    if (line.search(':') !== -1) {
      if (line.match(/Infection/)) party = 'Infection'
      continue
    }

    let [ units, hp, damage, attackType, initiative ] = line
      .match(/^(\d+) .* (\d+) hit .* (\d+) (\w+) damage .* (\d+)$/)
      .slice(1)

    let immunities = []
    let weaknesses = []

    if (line.match(/(immune|weak)/)) {
      let specifics = line
        .match(/\((.*)\)/)[1]
        .split(';')
        .map(s => s.trim())
        .sort()

      specifics.forEach(text => {
        if (text.match(/immune/)) {
          immunities = [
            ...immunities,
            ...text.match(/immune to (.*)/).slice(1)[0].split(', ')
          ]
        } else {
          weaknesses = [
            ...weaknesses,
            ...text.match(/weak to (.*)/).slice(1)[0].split(', ')
          ]
        }
      })
    }

    groups.push(new Group({
      party, units, hp, damage, attackType, initiative, immunities, weaknesses
    }))
  }

  return groups
}

module.exports = {
  findUnitsAfterBattle,
  getInput
}
