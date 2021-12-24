import { version } from '@magic/test'

import d from '../src/index.mjs'

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

export default version(d, spec)
