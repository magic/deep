const { is } = require('@magic/test')

const deep = require('../src')

const funcs = [
  deep.equal,
  deep.equals,
  deep.different,
  deep.merge,
  deep.diff,
  deep.loop,
  deep.flatten,
]

const fns = [
  { fn: () => funcs.every(is.function), expect: true },
  { fn: () => deep.equal.toString() === deep.equals.toString() },
  { fn: () => deep.different.toString() === deep.diff.toString() },
  { fn: () => Object.keys(deep), expect: is.length.equal(funcs) },
]

module.exports = fns