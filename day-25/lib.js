/*
 * compute 4-dim constellations
 *
 */

const fs = require('fs')

const getInput = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    const coords = data.trim().split('\n').map(line => {
      return line.match(/^(.*),(.*),(.*),(.*)$/).slice(1).map(Number)
    })

    cb(coords)
  })
}

const manhattan = (c1, c2) => {
  return (
    Math.abs(c1[0] - c2[0]) +
    Math.abs(c1[1] - c2[1]) +
    Math.abs(c1[2] - c2[2]) +
    Math.abs(c1[3] - c2[3])
  )
}

const assembleConstellations = coords => {
  let constellations = []

  for (let coord of coords) {
    let matches = []

    constellations.forEach((constellation, i) => {
      for (let point of constellation) {
        if (manhattan(coord, point) <= 3) {
          matches.push(i)
          return
        }
      }
    })

    if (!matches.length) {
      constellations.push([coord])
      continue
    }

    if (matches.length === 1) {
      constellations[matches[0]].push(coord)
      continue
    }

    let newConstellation = [coord]

    for (let i of matches) {
      newConstellation = [
        ...newConstellation,
        ...constellations[i]
      ]
    }

    constellations = [
      ...constellations.filter((c, i) => !matches.includes(i)),
      newConstellation
    ]
  }

  return constellations
}

module.exports = {
  assembleConstellations,
  getInput
}
