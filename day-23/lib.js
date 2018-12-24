const fs = require('fs')

const reformat = ({ x, y, z, range }) => {
  return {
    x: x - range,
    y: y - range,
    z: z - range,
    wx: 2 * range + 1,
    wy: 2 * range + 1,
    wz: 2 * range + 1
  }
}

const findOverlap = (r1, r2) => {
  const pos = {
    x: Math.max(r1.x, r2.x),
    y: Math.max(r1.y, r2.y),
    z: Math.max(r1.z, r2.z)
  }

  const widths = {
    wx: Math.min(r1.x + r1.wx, r2.x + r2.wx) - pos.x,
    wy: Math.min(r1.y + r1.wy, r2.y + r2.wy) - pos.y,
    wz: Math.min(r1.z + r1.wz, r2.z + r2.wz) - pos.z
  }

  if (widths.wx <= 0 || widths.wy <= 0 || widths.wz <= 0) return null

  return {
    ...pos,
    ...widths
  }
}

const findOverlaps = regions => {
  let overlaps = []
  let overlap

  for (let i = 0; i < regions.length - 1; i++) {
    for (let j = i + 1; j < regions.length; j++) {
      overlap = findOverlap(regions[i], regions[j])

      if (overlap) overlaps.push(overlap)
    }
  }

  return overlaps
}

const reduceDuplicates = regions => {
  const result = []
  const memory = {}

  let key, value

  for (let { x, y, z, wx, wy, wz } of regions) {
    key = `${x},${y},${z}`
    value = `${wx},${wy},${wz}`

    if (memory[key] && memory[key][value]) continue

    memory[key] = {}
    memory[key][value] = true

    result.push({ x, y, z, wx, wy, wz })
  }

  return result
}

const manhattan = (b1, b2) => {
  return Math.abs(b1.x - b2.x) + Math.abs(b1.y - b2.y) + Math.abs(b1.z - b2.z)
}

const findStrongest = bots => {
  return bots.reduce((strongest, bot) => {
    return bot.range > strongest.range ? bot : strongest
  })
}

const parseLine = line => {
  const [ x, y, z, r ] = line.match(/<(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/).slice(1).map(Number)
  return { x, y, z, range: r }
}

const getInput = (filename, cb) => {
  fs.readFile(filename, 'utf8', (_, data) => {
    cb(data.trim().split('\n').filter(Boolean).map(parseLine))
  })
}

module.exports = {
  reformat,
  findOverlap,
  findOverlaps,
  findStrongest,
  getInput,
  manhattan,
  parseLine,
  reduceDuplicates
}
