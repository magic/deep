import { is } from '@magic/test'

import { loop } from '../src/index.mjs'

const fns = [
  { fn: () => loop(e => e, ['test']), expect: is.array },
  { fn: () => loop(e => e, ['test'], {})[0][0], expect: 'test' },
  { fn: () => loop(e => e, ['test'], {})[1], expect: is.object },
  { fn: () => loop(e => e, ['test'], {}), expect: is.object },
  { fn: () => loop(), expect: undefined },
  {
    fn: () => loop(() => 1, ['t', 't2', ['t3']]),
    expect: is.deep.equal([1, 1, [1]]),
    info: 'Function can be first argument',
  },
  {
    fn: () => loop(['test', 'test2', ['test3']], () => 1),
    expect: is.deep.equal([1, 1, [1]]),
    info: 'Function can be second argument',
  },
  { fn: () => loop(() => 1, ['str', 'str2', ['str3']]), expect: is.deep.equal([1, 1, [1]]) },
  { fn: () => loop(a => a, []), expect: is.array },
  { fn: () => loop(a => a, []), expect: is.empty },
  { fn: () => loop(a => a), expect: undefined },
  { fn: () => loop(), expect: undefined },
  { fn: () => loop({ t: 't' }, 'test'), expect: is.deep.equal([{ t: 't' }, 'test']) },
  { fn: () => loop(a => a + 1, 1, 2), expect: is.deep.equal([2, 3]) },
  { fn: () => loop(['test'], a => a), expect: is.deep.equal(['test']) },
  { fn: () => loop(e => e + 1, [1, 2, [3]]), expect: is.deep.equal([2, 3, [4]]) },
  { fn: () => loop([2, 3, [1]], e => e + 1), expect: is.deep.equal([3, 4, [2]]) },
  {
    fn: () =>
      loop(
        () => true,
        () => false,
      ),
    info: 'First function wraps around second',
  },
  {
    fn: () =>
      loop(
        () => true,
        () => false,
      ),
    info: 'First function wraps around second',
  },
  {
    fn: () =>
      loop(
        () => true,
        false,
        () => false,
      ),
    expect: is.deep.equal([true, true]),
    info: 'First function wraps all arguments',
  },
]

export default fns
