/*
 * Compute plant evolution according to spec
 *
 */

const { sum } = require('../utils')

// returns the specimen and 0-position after n generations
const evolve = (init, n, rules) => {
  let newState, newOffset
  let state = init
  let generation = 0
  let offset = 0

  while (generation++ < n) {
    [ newState, newOffset ] = step(state, offset, rules)

    // pattern may become stationary
    if (newState === state) break

    state = newState
    offset = newOffset
  }

  // evolve stationary pattern to the end
  offset = newOffset + (newOffset - offset) * (n - generation)

  return [state, offset]
}

// returns the sum of pot ids (considering offset) that have a plant
const evaluate = (state, offset) => state
  .split('')
  .map((v, i) => v === '#' ? offset + i : 0)
  .reduce(sum)

// returns state and offset after one step of evolution
const step = (state, offset, rules) => {
  let before = '....' + state + '....'
  let after = ''

  for (let i = 2; i < before.length - 2; i++) {
    after += rules[before.substr(i - 2, 5)] ? '#' : '.'
  }

  // remove leading/trailing '.'
  let left, right

  for (left = 0; left < after.length && after[left] === '.'; left++);
  for (right = after.length - 1; right > 0 && after[right] === '.'; right--);

  // edge case: no flowers left
  if (left === after.length) return ['.', 0]

  return [after.substr(left, right - left + 1), offset - 2 + left]
}

module.exports = { evaluate, evolve, step }
