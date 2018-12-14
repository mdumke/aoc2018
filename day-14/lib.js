// returns the 10 digits of the result after numTrials steps
const generateRecipes = numTrials => {
  const arr = new Int8Array(numTrials + 10)

  arr[0] = 3
  arr[1] = 7

  let workers = [0, 1]
  let score
  let current = 2

  while (numTrials-- > 0 - 10) {
    // combine recipes, add score
    score = combineRecipes(arr, workers)

    for (let i = 0; i < score.length; i++) {
      arr[current + i] = score[i]
    }

    current += score.length

    // advance workers
    workers = advanceWorkers(workers, arr, current)
  }

  return arr.slice(numTrials + 1).join('')
}

// returns array of digits, the result of combining current recipes
const combineRecipes = (arr, workers) => {
  let score = arr[workers[0]] + arr[workers[1]]

  return score < 10
    ? [score]
    : [Math.floor(score / 10), score % 10]

  return [score]
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

module.exports = { generateRecipes }
