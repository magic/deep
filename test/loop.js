const is = require('@magic/types')

const deep = require('../src')

const fns = [
  { fn: () => deep.loop(e => e, ['test']), expect: is.array },
  {
    fn: () => deep.loop(e => e, ['test'], {}),
    expect: t => t && t[0] === 'test',
  },
  { fn: () => deep.loop(e => e, ['test'], {}), expect: is.object },
  { fn: () => deep.loop(), expect: undefined },
  {
    fn: () => deep.loop(() => false, ['test', 'test2', ['test3']]),
    expect: t => deep.equal(t, [false, false, [false]]),
    info: 'Function can be first argument',
  },
  {
    fn: () => deep.loop(['test', 'test2', ['test3']], () => false),
    expect: t => deep.equal(t, [false, false, [false]]),
    info: 'Function can be second argument',
  },
  {
    fn: () => deep.loop(() => 'applied', ['test', 'test2', ['test3']]),
    expect: t => deep.equal(t, ['applied', 'applied', ['applied']]),
  },
  { fn: () => deep.loop(['test'], () => {}), expect: t => t[0] === undefined },
]

module.exports = fns
