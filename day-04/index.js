/*
 * Repose Record
 *
 * Problem statement: adventofcode.com/2018/day/4
 */

const {
  findMostSleptMinuteByGuard,
  findSleepiestGuardAndMinute,
  getRecords
} = require('./repose')

getRecords(records => {
  const q1 = findSleepiestGuardAndMinute(records)
  const q2 = findMostSleptMinuteByGuard(records)

  console.log(`Day 4.1: ${q1.guard}, ${q1.minute}, ${q1.guard * q1.minute}`)
  console.log(`Day 4.2: ${q2.guard}, ${q2.minute}, ${q2.guard * q2.minute}`)
})
