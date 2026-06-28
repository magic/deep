import { is } from '@magic/test'

import merge from '../src/merge.js'

export default [
  {
    fn: () => merge([1], 2),
    expect: is.deep.eq([1, 2]),
    info: 'can concat numerical into array',
  },
  {
    fn: () => merge([1, [2]], 3),
    expect: is.deep.eq([1, [2], 3]),
    info: 'can deep concat arrays',
  },
  {
    fn: () => merge([1, { k: 2 }], 3),
    expect: is.deep.eq([1, { k: 2 }, 3]),
    info: 'can merge objects',
  },
  {
    fn: () => merge([1, new Date(23)], 3),
    expect: is.len.eq(3),
    info: 'can merge dates',
  },
  {
    fn: () => merge([1, /test/], 3),
    expect: is.deep.eq([1, /test/, 3]),
    info: 'keeps regex intact when merging',
  },
  {
    fn: () => merge([1, a => a], 3),
    expect: is.deep.eq([1, a => a, 3]),
    info: 'keeps functions intact when merging',
  },
  {
    fn: () => merge([1], 2),
    expect: is.deep.eq([1, 2]),
    info: 'if first argument is array and second is numerical, they get concated',
  },
  {
    fn: () => merge([1], [2, 3]),
    expect: is.deep.eq([1, 2, 3]),
    info: 'if both arguments are arrays, they get concatenated',
  },
  {
    fn: () => merge(1, [2, { t: 3 }]),
    expect: is.deep.eq([1, 2, { t: 3 }]),
    info: 'pass numerical as first argument and array as second. merge first arg into second.',
  },
  {
    fn: () => merge({ t: 1 }, { t: 2 }),
    expect: is.deep.eq({ t: 2 }),
    info: 'if a key exists, it gets overwritten',
  },
  {
    fn: () => merge(undefined, { t: 3 }),
    expect: is.deep.eq({ t: 3 }),
    info: 'undefined arguments just disappear from the object',
  },
  {
    fn: () => merge({ t: { t: 4, ttt: 5 } }, { t: { t: 3, tt: 2 } }),
    expect: is.deep.eq({ t: { t: 3, tt: 2, ttt: 5 } }),
    info: 'objects get merged into objects correctly, overwriting subkeys',
  },
  {
    fn: () => merge({ t: { t: 4 } }, { t: { tt: 2 } }),
    expect: is.deep.eq({ t: { t: 4, tt: 2 } }),
  },
  {
    fn: () => merge({ t: { t: 4 } }, 'test'),
    expect: [{ t: { t: 4 } }, 'test'],
    info: 'if given an object and a string, return them as an array',
  },
  {
    fn: () => merge({ t: { t: 4 } }),
    expect: { t: { t: 4 } },
    info: 'if no second argument given, return the first unchanged',
  },
  {
    fn: () => merge({ a: 1, b: 2 }, Object.create({ c: 3 })),
    expect: is.deep.eq({ a: 1, b: 2 }),
    info: 'handles object with inherited hasOwnProperty, keeping only own properties from first arg',
  },
  {
    fn: () => merge({ a: 1 }, Object.create({ a: 2 })),
    expect: is.deep.eq({ a: 1 }),
    info: 'key exists on o1 but only inherited on o2, keeps o1 value',
  },
  {
    fn: () => {
      const result = merge({ a: 1, b: 2 }, { a: 10, hasOwnProperty: null })
      return result.a === 1 && result.b === 2
    },
    expect: true,
    info: 'hasOwnProperty is null (not a function), uses o1 values',
  },
  {
    fn: () => {
      const result = merge({ x: 1 }, { x: 2, hasOwnProperty: 'string' })
      return result.x === 1
    },
    expect: true,
    info: 'hasOwnProperty is a string, not callable, uses o1 values',
  },
]
