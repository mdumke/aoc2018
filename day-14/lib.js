/*
 * Compute recipe combinations and score them according to spec
 *
 */

// returns the necessary number of trials before pattern appears
const findPattern = pattern => {
  let arr = new Int8Array([3, 7])
  let workers = [0, 1]
  let length = 2
  let score

  while (true) {
    score = combineRecipes(arr, workers)

    // make sure array is still large enough
    if (length + score.length > arr.length) {
      arr = doubleArraySize(arr)
    }

    // append new score
    for (let i = 0; i < score.length; i++) {
      arr[length + i] = score[i]
    }

    length += score.length
    workers = advanceWorkers(workers, arr, length)

    if (hasPattern(arr, length, pattern)) break
    if (score.length === 2 && hasPattern(arr, length - 1, pattern)) {
      length--
      break
    }
  }

  return length - pattern.length
}

// returns true if the last digits hold the given pattern
const hasPattern = (arr, length, pattern) => {
  return (
    pattern.length < length &&
    arr.slice(length - pattern.length, length).join('') === pattern
  )
}

// returns a copy of arr of double size, filled with trailing 0s
const doubleArraySize = arr => {
  let newArr = new Int8Array(arr.length * 2)

  for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i]
  }

  return newArr
}

// returns the 10 digits of the result after numTrials steps
const generateRecipes = numTrials => {
  const arr = new Int8Array(numTrials + 10)

  arr[0] = 3
  arr[1] = 7

  let workers = [0, 1]
  let score
  let current = 2

  while (numTrials-- > -10) {
    // combine recipes, add score
    score = combineRecipes(arr, workers)

    for (let i = 0; i < score.length; i++) {
      arr[current + i] = score[i]
    }

    current += score.length
    workers = advanceWorkers(workers, arr, current)
  }

  return arr.slice(numTrials + 1).join('')
}

// returns array of digits, the score of combining current recipes
const combineRecipes = (arr, workers) => {
  let score = arr[workers[0]] + arr[workers[1]]

  return score < 10
    ? [score]
    : [Math.floor(score / 10), score % 10]
}

// returns the workers at their new positions
const advanceWorkers = (workers, arr, length) => {
  let steps0 = arr[workers[0]] + 1
  let steps1 = arr[workers[1]] + 1

  return [
    (workers[0] + steps0) % length,
    (workers[1] + steps1) % length
  ]
}

module.exports = { findPattern, generateRecipes }
