// too low: 88894455

const { manhattan } = require('../utils')
const {
  getInput,
  findInRange,
  findStrongest,
  findMostCoveredPoint
} = require('./lib')


getInput('input.txt', bots => {
  // part 1
//   console.log(findInRange(bots, findStrongest(bots)).length)

  const mostCovered = findMostCoveredPoint(bots)
  console.log(mostCovered, manhattan(mostCovered.cube))
})

