import { is } from '@magic/test'

import d, * as deep from '../src/index.mjs'

const funcs = [
  deep.equal,
  deep.equals,
  deep.eq,
  deep.different,
  deep.merge,
  deep.diff,
  deep.loop,
  deep.flatten,
  () => 'mockDefaultExport',
]

const fns = [
  { fn: () => d, expect: is.deep.eq(deep.default), info: 'default exports match' },
  { fn: () => funcs.every(is.function), expect: true, info: 'all exports are functions' },
  { fn: () => deep.equal, expect: is.deep.eq(deep.equals), info: 'deep.equals aliases deep.equal' },
  { fn: () => deep.equal, expect: is.deep.eq(deep.eq), info: 'deep.eq aliases deep.equal' },
  {
    fn: () => deep.different,
    expect: is.deep.eq(deep.diff),
    info: 'deep.diff aliases deep.different',
  },
  { fn: () => Object.keys(deep), expect: is.length.equal(funcs), info: 'expected length matches' },
]

export default fns
