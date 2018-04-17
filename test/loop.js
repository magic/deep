const is = require('@magic/types')

const deep = require('../src')

const add = e => e + 1
const items = [1, 2, [3]]
const expect = t => deep.equal(t, [2, 3, [4]])

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
  { fn: () => deep.loop(add, items), expect },
  { fn: () => deep.loop(items, add), expect },
  {
    fn: () => deep.loop(() => true, () => false),
    expect: true,
    info: 'First function wraps around second function',
  },
  {
    fn: () => deep.loop(() => false, () => true),
    expect: false,
    info: 'First function wraps around second function',
  },
]

module.exports = fns
