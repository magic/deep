import { is } from '@magic/test'

import * as deep from '../src/index.mjs'

const funcs = [
  deep.equal,
  deep.equals,
  deep.different,
  deep.merge,
  deep.diff,
  deep.loop,
  deep.flatten,
  () => 'mockDefaultExport',
]

const fns = [
  { fn: () => funcs.every(is.function), expect: true },
  { fn: () => deep.equal.toString() === deep.equals.toString() },
  { fn: () => deep.different.toString() === deep.diff.toString() },
  { fn: () => Object.keys(deep), expect: is.length.equal(funcs) },
]

export default fns
