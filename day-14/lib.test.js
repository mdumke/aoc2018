const { test } = require('tap')
const { findPattern, generateRecipes } = require('./lib')

test('generateRecipes', g => {
  g.test('given example 1', t => {
    t.equal(generateRecipes(9), '5158916779')
    t.end()
  })

  g.test('given example 2', t => {
    t.equal(generateRecipes(5), '0124515891')
    t.end()
  })

  g.test('given example 3', t => {
    t.equal(generateRecipes(18), '9251071085')
    t.end()
  })

  g.test('given example 3', t => {
    t.equal(generateRecipes(2018), '5941429882')
    t.end()
  })

  g.end()
})

test('findPattern', g => {
  g.test('given example 1', t => {
    t.equal(findPattern('51589'), 9)
    t.end()
  })

  g.test('given example 2', t => {
    t.equal(findPattern('01245'), 5)
    t.end()
  })

  g.test('given example 3', t => {
    t.equal(findPattern('92510'), 18)
    t.end()
  })

  g.test('given example 4', t => {
    t.equal(findPattern('59414'), 2018)
    t.end()
  })

  g.end()
})
