const run = require('test')

const moduleexports = require('./exports')
const equal = require('./equal')
const objEqual = require('./objEqual')
const loop = require('./loop')

const tests = {
  moduleexports,
  equal,
  objEqual,
  loop,
}

run(tests)
