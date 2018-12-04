/*
 * Functions to find sleepiest guards and minutes
 *
 */

const fs = require('fs')

// returns guard and minute to select for action (acc. strategy 2)
const findMostSleptMinuteByGuard = records => {
  const lookup = buildSleepMap(records)

  const sleepiestMinutesByGuard = Object
    .keys(lookup)
    .map(guard => ({ guard, ...findSleepiestMinute(lookup[guard]) }))
    .sort((a, b) => b.count - a.count)

  return {
    guard: sleepiestMinutesByGuard[0].guard,
    minute: sleepiestMinutesByGuard[0].value
  }
}

// returns guard and minute to select for action (acc. strategy 1)
const findSleepiestGuardAndMinute = records => {
  const sleepLookup = buildSleepMap(records)

  const { guard } = findSleepiestGuard(sleepLookup)
  const minute = findSleepiestMinute(sleepLookup[guard]).value

  return { guard, minute }
}

// returns minute most often covered by intervals, with sleep-count
const findSleepiestMinute = intervals => {
  const minutes = new Array(60).fill(0)

  intervals.forEach(([ start, end ]) => {
    for (let i = start; i < end; i++) minutes[i]++
  })

  const max = minutes.reduce((memo, n) => n > memo ? n : memo)
  const argmax = minutes.indexOf(max)

  return { value: argmax, count: max }
}

// returns the id of the most often asleep guard
// ASSUMES: lookup has at least one entry
const findSleepiestGuard = lookup => {
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
  findSleepiestGuard,
  findMostSleptMinuteByGuard,
  findSleepiestMinute,
  findSleepiestGuardAndMinute,
  getRecords
}
