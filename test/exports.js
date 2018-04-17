const is = require('@magic/types')

const deep = require('../src')

const funcs = [
  deep.equal,
  deep.equals,
  deep.loop,
  deep.flatten,
]

const fns = [
  { fn: () => funcs.filter(is.function), expect: t => t.length === funcs.length },
]

module.exports = fns
