// too low: 88894455

const { getInput, findMostCoveredPoint } = require('./lib')
const { manhattan } = require('../utils')

getInput('input.txt', bots => {
  const current = findMostCoveredPoint(bots)
  console.log(current, manhattan(current.cube))
})

