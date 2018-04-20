const { is } = require('@magic/test')

const deep = require('../src')

const fns = [
  { fn: () => deep.loop(e => e, ['test']), expect: is.array },
  {
    fn: () => deep.loop(e => e, ['test'], {})[0][0],
    expect: 'test',
  },
  {
    fn: () => deep.loop(e => e, ['test'], {})[1],
    expect: is.object,
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
  { fn: () => deep.loop(['test'], () => {})[0], expect: undefined },
  {
    fn: () => deep.loop(e => e + 1, [1, 2, [3]]),
    expect: t => deep.equal(t, [2, 3, [4]]),
  },
  {
    fn: () => deep.loop([2, 3, [1]], e => e + 1),
    expect: t => deep.equal(t, [3, 4, [2]]),
  },
  {
    fn: () => deep.loop(() => true, () => false),
    info: 'First function wraps around second function',
  },
  {
    fn: () => deep.loop(() => false, () => true),
    expect: false,
    info: 'First function wraps around second function',
  },
  {
    fn: () => deep.loop(() => true, false, () => false)[0],
    info: 'First function wraps around second argument if third is a function',
  },
  {
    fn: () => deep.loop(() => true, false, () => false)[1],
    info: 'First function wraps around third function',
  },
]

module.exports = fns
