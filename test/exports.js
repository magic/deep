const { isFunction } = require('types')

const deep = require('../src')

const fns = [
  { fn: () => deep.equal, expect: isFunction },
  { fn: () => deep.equals, expect: isFunction },
  { fn: () => deep.objEqual, expect: isFunction },
  { fn: () => deep.loop, expect: isFunction },
]

module.exports = fns
