const { is } = require('@magic/test')

const merge = require('../src/merge')

module.exports = [
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
    expect: is.deep.eq([1, new Date(23), 3]),
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
    expect: is.deep.eq([{ t: { t: 4 } }, 'test']),
    info: 'if given an object and a string, return them as an array',
  },
  {
    fn: () => merge({ t: { t: 4 } }),
    expect: is.deep.eq({ t: { t: 4 } }),
    info: 'if no second argument given, return the first unchanged',
  },
]
