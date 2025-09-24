import { is, version } from '@magic/test'

import d from '../src/index.js'

const spec = {
  equal: 'fn',
  equals: 'fn',
  eq: 'fn',
  different: 'fn',
  diff: 'fn',
  flatten: 'fn',
  loop: 'fn',
  merge: 'fn',
}

export default [
  ...version(d, spec),
  {
    fn: d.equal.toString(),
    expect: d.equals.toString(),
    info: 'deep.equal and deep.equals are identical',
  },
  { fn: d.equal.toString(), expect: d.eq.toString(), info: 'deep.equal and deep.eq are identical' },
  {
    fn: d.different,
    expect: is.deep.equal(d.diff),
    info: 'deep.different and deep.diff are identical',
  },
]
