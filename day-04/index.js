/*
 * Repose Record
 *
 * Problem statement: adventofcode.com/2018/day/4
 */

const {
  findSleepiestGuardAndMinute,
  getRecords
} = require('./repose')

getRecords(records => {
  const { guard, minute } = findSleepiestGuardAndMinute(records)

  console.log(`Day 4.1: guard ${guard} at ${minute} = ${guard * minute}`)
})
