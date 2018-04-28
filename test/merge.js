const { is } = require('@magic/test')

const merge = require('../src/merge')

const o1 = {
  t: 't',
}

const o2 = {
  t: 't2',
  t3: 't3',
}

const merged = { ...o1, ...o2 }

const a1 = ['t']
const a2 = ['t2', 't3']

const mergedArray = [...a1, ...a2]

const deep1 = {
  t: {
    t2: {
      t3: 't',
    },
  },
}

const deep2 = {
  t: {
    t2: {
      t3: 't3',
      t4: 't4',
      t5: () => {},
    },
  },
}

const deepMerged = {
  t: {
    t2: { ...deep1.t.t2, ...deep2.t.t2 },
  },
}

const deepA1 = ['t', ['t2', 't2'], 't', [() => {}]]
const deepA2 = ['tt', ['t2', 't4']]

const deepMergedA = ['tt', ['t2', 't4'], 't']

module.exports = [
  {
    fn: () => merge({}, {}),
    expect: is.object,
    info: 'Merged empty objects return an object',
  },
  {
    fn: () => merge(o1, o2),
    expect: is.object,
    info: 'Merged objects return an object',
  },
  {
    fn: () => merge([], []),
    expect: is.array,
    info: 'Merged empty arrays return an array',
  },
  {
    fn: () => merge([], []),
    expect: is.empty,
    info: 'Merged empty arrays return an empty array',
  },
  {
    fn: () => merge(a1, a2),
    expect: is.array,
    info: 'Merged arrays return an array',
  },
  {
    fn: () => merge(o1, o2),
    expect: is.deep.equal(merged),
    info: 'Shallow merged objects are equal',
  },
  {
    fn: () => merge(deep1, deep2),
    expect: is.deep.equal(deepMerged),
    info: 'Deeply merged Objects are equal',
  },
  {
    fn: () => merge(deepA1, deepA2),
    expect: is.array,
    info: 'Merged deep arrays return arrays',
  },
  {
    fn: () => merge(deepA1, deepA2),
    expect: is.deep.equal(deepMergedA),
    info: 'Deeply merged arrays are equal',
  },
  {
    fn: () => merge(deep1, deep2),
    expect: t => is.fn(t.t.t2.t5),
    info: 'Functions stay intact when deep merging objects',
  },
  {
    fn: () => merge(deepA1, deepA2),
    expect: t => is.fn(t[3][0]),
    info: 'Functions stay intact when deep merging arrays',
  },
  {
    fn: () => merge(deepA1, deepA2),
    expect: t => t[3][0].toString() === (() => {}).toString(),
    info: 'Functions stay string equal when deep merging arrays',
  },
]
