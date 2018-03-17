const deep = require('../src')

const fns = [
  { fn: () => deep.loop(['test']), expect: t => t[0] === 'test' },
  { fn: () => deep.loop(['test'], {}), expect: t => t[0] === 'test' },
  { fn: () => deep.loop(['test'], {}), expect: t => t[0] === 'test' },
  { fn: () => deep.loop(), expect: undefined },
  {
    fn: () => deep.loop(['test', 'test2', ['test3']], () => false),
    expect: t => deep.equal(t, [false, false, [false]]),
  },
  {
    fn: () => deep.loop(['test', 'test2', ['test3']], () => 'applied'),
    expect: t => deep.equal(t, ['applied', 'applied', ['applied']]),
  },
]

module.exports = fns
