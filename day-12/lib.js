/*
 * Compute plant evolution according to spec
 *
 */

const fs = require('fs')

// returns the specimen and 0-position after n generations
const evolve = (init, n, rules) => {
  let pad = Array(n * 2).fill('.').join('')
  let state = pad + init + pad

  for (let i = 0; i < n; i++) {
    state = step(state, rules)
  }

  return [state, pad.length]
}

// return the sum of state ids (considering left pad) that have a plant
const evaluate = (state, pad) => state
  .split('').reduce((sum, c, i) => sum + (c === '#' ? i - pad : 0), 0)

// returns state after one step of evolution
const step = (state, rules) => {
  let result = '..'

  for (let i = 2; i < state.length - 2; i++) {
    result += rules[state.substr(i - 2, 5)] ? '#' : '.'
  }

  result += '..'
  return result
}

// returns the data from input.txt
const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    const lines = data.trim().split('\n').filter(Boolean)
    const init = lines[0].slice(15)

    const rules = lines.slice(1).reduce((lookup, line) => {
      lookup[line.substr(0, 5)] = line[9] === '#'
      return lookup
    }, {})

    cb(init, rules)
  })
}

module.exports = { evaluate, evolve, getInput, step }
