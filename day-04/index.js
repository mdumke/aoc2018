/*
 * Repose Record
 *
 * Problem statement: adventofcode.com/2018/day/4
 */

const {
  findTargetGuardAndMinute,
  getRecords
} = require('./repose')

getRecords(records => {
  const { guard, minute } = findTargetGuardAndMinute(records)
  console.log(guard, minute)

  console.log(`Day 4.1: guard ${guard} at ${minute} = ${guard * minute}`)
})
