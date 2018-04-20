const { is } = require('@magic/test')

const deep = require('../src')

const funcs = [deep.equal, deep.equals, deep.loop, deep.flatten]

const fns = [{ fn: () => funcs.every(is.function), expect: true }]

module.exports = fns
