const { test } = require('tap')
const { generateRecipes } = require('./lib')

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

