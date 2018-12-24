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

const evaluate = (positions, bots) => {
  return positions.map(pos => evaluatePosition(pos, bots))
}

const getRandomPosition = boundingBox => {
  const { xMin, yMin, zMin, xWidth, yWidth, zWidth } = boundingBox

  return {
    x: xMin + Math.floor(Math.random() * xWidth),
    y: yMin + Math.floor(Math.random() * yWidth),
    z: zMin + Math.floor(Math.random() * zWidth)
  }
}

const getStartingPosition = (boundingBox, bots) => {
  let position

  do {
    position = getRandomPosition(boundingBox)
  } while (evaluatePosition(position, bots) < 20)

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

const computeUpdate = (population, rewards) => {
  return population.reduce(({ x, y, z}, position, i) => {
    return {
      x: x + position.x * rewards[i],
      y: y + position.y * rewards[i],
      z: z + position.z * rewards[i]
    }
  }, { x: 0, y: 0, z: 0})
}

const findPlateauPosition = bots => {
  const boundaries = getBoundingBox(bots)

  let population, rewards, update
  let position = getStartingPosition(boundaries, bots)

  const alpha = 0.1

  const variance = epoch => epoch < 4000
    ? epoch > 3000 ? 0.01 : epoch > 500 ? 0.001 : 0.0001
    : 0.5

  let epoch = 5000

  while (epoch--) {
    population = mutate(position, 20, variance(epoch), boundaries)

    rewards = evaluate(population, bots)
    rewards = normalize(rewards)

    update = computeUpdate(population, rewards)

    position = {
      x: Math.floor(position.x + alpha * update.x),
      y: Math.floor(position.y + alpha * update.y),
      z: Math.floor(position.z + alpha * update.z)
    }

//     if (epoch % 500 === 0) console.log(evaluatePosition(position, bots))
  }

  return position
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

const findLowestY = ({ x, y, z }, targetValue, bots) => {
  let lo = 0
  let hi = y
  let current, count

  while (lo + 1 < hi) {
    current = Math.floor((lo + hi) / 2)
    count = evaluatePosition({ x, y: current, z }, bots)

    if (count < targetValue) {
      lo = current
    } else {
      hi = current
    }
  }

  return hi
}

getInput('input.txt', bots => {
//   const strongest = findStrongest(bots)
//   const inRange = bots.filter(bot => manhattan(bot, strongest) <= strongest.range)

//   console.log(bots)

  const start = findPlateauPosition(bots)
  console.log(start, evaluatePosition(start, bots))
//   assert(evaluatePosition(start, bots) === 873)

//   const start = { x: 21098744, y: 23443065, z: 38103185 }

//   let { x, y, z } = start
// 
//   let xLow = findLowestX(start, 783, bots)
//   let yLow = findLowestY(start, 783, bots)
// 
//   console.log(xLow)
//   console.log(evaluatePosition({ x: xLow, y: yLow, z}, bots))


//   console.log(start)
})
