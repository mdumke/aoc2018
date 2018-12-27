/*
 *
 *
 */

const assert = require('assert')

const { getInput, findStrongest, manhattan, reformat, findOverlaps, reduceDuplicates } = require('./lib')
const { min, max, sum } = require('../utils')

const getBoundingBox = bots => {
  const xMin = bots.map(({ x, range }) => x - range).reduce(min)
  const yMin = bots.map(({ y, range }) => y - range).reduce(min)
  const zMin = bots.map(({ z, range }) => z - range).reduce(min)

  const xMax = bots.map(({ x, range }) => x - range).reduce(max)
  const yMax = bots.map(({ y, range }) => y - range).reduce(max)
  const zMax = bots.map(({ z, range }) => z - range).reduce(max)

  const xWidth = Math.abs(xMax - xMin)
  const yWidth = Math.abs(yMax - yMin)
  const zWidth = Math.abs(zMax - zMin)

  return {
    xMin, yMin, zMin,
    xMax, yMax, zMax,
    xWidth, yWidth, zWidth
  }
}

const evaluatePosition = (position, bots) => {
  return bots.reduce((count, bot) => {
    return count + (manhattan(bot, position) <= bot.range ? 1 : 0)
  }, 0)
}

getInput('input.txt', bots => {
//   const strongest = findStrongest(bots)
//   const inRange = bots.filter(bot => manhattan(bot, strongest) <= strongest.range)

//   console.log(bots)

  const start = findPlateauPosition(bots)
  console.log(start)
})






const findPlateauPositionOld = bots => {
  const boundaries = getBoundingBox(bots)

  let population, rewards, update
  let position = getStartingPosition(boundaries, bots, minValue)

  const alpha = epoch => {
    if (epoch < 5000) return 0.1
    if (epoch < 5000) return 0.1
    return 0.001
  }

  const variance = epoch => {
    if (epoch < 1000) return 0.5
    if (epoch < 3000) return 0.01
    if (epoch < 4000) return 0.001
    if (epoch < 5000) return 0.01
    if (epoch < 6000) return 0.001
    if (epoch < 7000) return 0.0001
    return 0.0001
  }

  let numEpochs = 10000
  let epoch = 0
  let best = { reward: 0 }

  while (epoch++ < numEpochs) {
    population = mutate(position, 20, variance(epoch), boundaries)

    let [ rewards, currentBest ] = evaluate(population, bots)
    rewards = normalize(rewards)

    update = computeUpdate(population, rewards)

    position = {
      x: Math.floor(position.x + alpha(epoch) * update.x),
      y: Math.floor(position.y + alpha(epoch) * update.y),
      z: Math.floor(position.z + alpha(epoch) * update.z)
    }

    if (currentBest.reward > best.reward) {
      best = { ...currentBest }
    }

    if (epoch % 500 === 0) {
      console.log(epoch, evaluatePosition(position, bots), best.reward)
    }
  }

  return best
}

const findLowestX = ({ x, y, z }, targetValue, bots) => {
  let lo = 0
  let hi = x
  let current, count

  while (lo + 1 < hi) {
    current = Math.floor((lo + hi) / 2)
    count = evaluatePosition({ x: current, y, z }, bots)

    if (count < targetValue) {
      lo = current
    } else {
      hi = current
    }
  }

  return hi
}

const mutate = (position, n, variance, boundingBox) => {
  const population = []

  for (let i = 0; i < n; i++) {
    population.push(mutatePosition(position, variance, boundingBox))
  }

  return population
}

const normalize = values => {
  const mean = values.reduce(sum) / values.length
  const std = Math.sqrt(values.map(v => Math.pow(v - mean, 2)).reduce(sum))

  return values.map(v => (v - mean) / std || 0)
}

const evaluate = (positions, bots) => {
  const rewards = []

  let reward
  let best = { reward: 0 }

  for (let position of positions) {
    reward = evaluatePosition(position, bots)
    rewards.push(reward)

    if (reward > best.reward) {
      best = {
        reward,
        position: { ...position }
      }
    }
  }

  return [rewards, best]
}

const getRandomPosition = boundingBox => {
  const { xMin, yMin, zMin, xWidth, yWidth, zWidth } = boundingBox

  return {
    x: xMin + Math.floor(Math.random() * xWidth),
    y: yMin + Math.floor(Math.random() * yWidth),
    z: zMin + Math.floor(Math.random() * zWidth)
  }
}

const getStartingPosition = (boundingBox, bots, minValue = 20) => {
  let position

  do {
    position = getRandomPosition(boundingBox)
  } while (evaluatePosition(position, bots) < minValue)

  return position
}

const mutatePosition = (position, variance, boundingBox) => {
  const { xMin, yMin, zMin, xWidth, yWidth, zWidth } = boundingBox

  return {
    x: position.x + Math.floor((Math.random() * xWidth - xWidth / 2) * variance),
    y: position.y + Math.floor((Math.random() * yWidth - yWidth / 2) * variance),
    z: position.z + Math.floor((Math.random() * zWidth - zWidth / 2) * variance)
  }
}

const computeUpdate = (population, rewards) => {
  return population.reduce(({ x, y, z}, position, i) => {
    return {
      x: x + position.x * rewards[i],
      y: y + position.y * rewards[i],
      z: z + position.z * rewards[i]
    }
  }, { x: 0, y: 0, z: 0})
}

const initPopulation = (n, boundingBox, bots, minValue) => {
  const population = []

  while (n--) {
    population.push(getStartingPosition(boundingBox, bots, minValue))
  }

  return population
}

const getNextGeneration = (nChildren, population, variance, boundingBox)  => {
  const candidates = []

  for (let position of population) {
    for (let i = 0; i < nChildren; i++) {
      candidates.push(mutatePosition(position, variance, boundingBox))
    }
  }

  return candidates
}

const optimize = (population, nChildren, bots, boundingBox) => {
  const variance = epoch => {
    if (epoch < 15) return 0.1
    if (epoch < 25) return 0.01
    if (epoch < 35) return 0.001
    return 0.000001
  }

  let candidates

  for (let epoch = 0; epoch < 50; epoch++) {
    candidates = [
      ...population,
      ...getNextGeneration(nChildren, population, variance(epoch), boundingBox)
    ]

    candidates = candidates
      .map(pos => ({ ...pos, value: evaluatePosition(pos, bots) }))
      .sort((c1, c2) => c2.value - c1.value)

    population = candidates.slice(0, population.length)
  }

  return population
}

const findPlateauPosition = bots => {
  const boundingBox = getBoundingBox(bots)

  const sizePopulation = 10
  const nChildren = 10

  const getNewPopulation = () => {
    return initPopulation(sizePopulation, boundingBox, bots, 20)
      .map(pos => ({ ...pos, value: evaluatePosition(pos, bots) }))
  }

  let population, newPopulation, candidates

  population = getNewPopulation()

  for (let round = 0; round < 2; round++) {
    console.log(round, population[0].value)
    candidates = [...population]

    for (let i = 0; i < 10; i++) {
      for (candidate of optimize(population, nChildren, bots, boundingBox)) {
        candidates.push(candidate)
      }
    }

    population = candidates
      .sort((c1, c2) => c2.value - c1.value)
      .slice(0, sizePopulation)
  }

  console.log(population)
}

