const { is } = require('@magic/test')

const deep = require('../src')

const fns = [
  { fn: () => deep.loop(e => e, ['test']), expect: is.array },
  { fn: () => deep.loop(e => e, ['test'], {})[0][0], expect: 'test' },
  { fn: () => deep.loop(e => e, ['test'], {})[1], expect: is.object },
  { fn: () => deep.loop(e => e, ['test'], {}), expect: is.object },
  { fn: () => deep.loop(), expect: undefined },
  {
    fn: () => deep.loop(() => 1, ['t', 't2', ['t3']]),
    expect: is.deep.equal([1, 1, [1]]),
    info: 'Function can be first argument',
  },
  {
    fn: () => deep.loop(['test', 'test2', ['test3']], () => 1),
    expect: is.deep.equal([1, 1, [1]]),
    info: 'Function can be second argument',
  },
  { fn: () => deep.loop(() => 1, ['str', 'str2', ['str3']]), expect: is.deep.equal([1, 1, [1]]) },
  { fn: () => deep.loop(a => a, []), expect: is.array },
  { fn: () => deep.loop(a => a, []), expect: is.empty },
  { fn: () => deep.loop(a => a), expect: undefined },
  { fn: () => deep.loop(), expect: undefined },
  { fn: () => deep.loop({ t: 't' }, 'test'), expect: is.deep.equal([{ t: 't' }, 'test']) },
  { fn: () => deep.loop(a => a + 1, 1, 2), expect: is.deep.equal([2, 3]) },
  { fn: () => deep.loop(['test'], a => a), expect: is.deep.equal(['test']) },
  { fn: () => deep.loop(e => e + 1, [1, 2, [3]]), expect: is.deep.equal([2, 3, [4]]) },
  { fn: () => deep.loop([2, 3, [1]], e => e + 1), expect: is.deep.equal([3, 4, [2]]) },
  { fn: () => deep.loop(() => true, () => false), info: 'First function wraps around second' },
  { fn: () => deep.loop(() => true, () => false), info: 'First function wraps around second' },
  {
    fn: () => deep.loop(() => true, false, () => false),
    expect: is.deep.equal([true, true]),
    info: 'First function wraps all arguments',
  },
]

module.exports = fns
