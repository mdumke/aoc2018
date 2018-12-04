const fs = require('fs')

// returns guard and minute to select for action
const findTargetGuardAndMinute = records => {
  const sleepLookup = buildSleepMap(records)

  const { guard } = findMostAsleepGuard(sleepLookup)
  const minute = findMostAsleepMinute(sleepLookup[guard])

  return { guard: Number(guard), minute }
}

// returns the (first) minute that is covered most often by given intervals
const findMostAsleepMinute = intervals => {
  const minutes = new Array(60).fill(0)

  intervals.forEach(([ start, end ]) => {
    for (let i = start; i < end; i++) minutes[i]++
  })

  return argMax(minutes)
}

// returns the id of the most often asleep guard
// ASSUMES: lookup has at least one entry
const findMostAsleepGuard = lookup => {
  return Object.keys(lookup).reduce((max, guard) => {
    if (!max.guard || sumSleepTime(lookup[guard]) > max.total) {
      max.guard = guard
      max.total = sumSleepTime(lookup[guard])
    }

    return max
  }, {})
}

// returns sleeping minutes by guard as { guard: [[sleep, wake], ...] }
// ASSUMES: first record is a guard; every sleep is followed by wake
const buildSleepMap = records => {
  let lookup = {}
  let guard
  let asleepAt

  for (let [ date, event ] of records) {
    if (event.guard) {
      guard = event.guard
      lookup[guard] = lookup[guard] || []
    }

    if (event.sleep) asleepAt = date.getMinutes()
    if (event.wake) lookup[guard].push([asleepAt, date.getMinutes()])
  }

  return lookup
}

// returns the index of the (first) largest element
const argMax = arr => {
  const max = arr.reduce((memo, n) => n > memo ? n : memo)
  return arr.indexOf(max)
}

// returns the sum of given minute-intervals
const sumSleepTime = intervals => intervals.reduce((sum, i) => {
  sum += i[1] - i[0]
  return sum
}, 0)

// returns parsed records ordered by date
const getRecords = cb => {
  fs.readFile('input.txt', 'utf8', (_, data) => {
    cb(data.split('\n').filter(Boolean).sort().map(parseRecord))
  })
}

// returns the raw record as array [date, event]
const parseRecord = line => {
  const [ date, event ] = line
    .match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2})] (.*)/)
    .slice(1)

  return [ new Date(date), parseEvent(event) ]
}

// returns the event as { guard: id }, { sleep }, or { wake }
const parseEvent = event => {
  if (event.match(/falls asleep/)) return { sleep: true }
  if (event.match(/wakes up/)) return { wake: true }

  return { guard: Number(event.match(/Guard #(\d+)/)[1]) }
}

module.exports = {
  buildSleepMap,
  findMostAsleepGuard,
  findMostAsleepMinute,
  findTargetGuardAndMinute,
  getRecords
}
