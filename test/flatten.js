const { is } = require('@magic/test')

const { flatten } = require('../src')

const date = new Date()

const fns = [
  {
    fn: () => flatten(['shallow'], [['deep']]),
    expect: is.deep.equal(['shallow', 'deep']),
    info: 'Flatten an array',
  },
  {
    fn: () => flatten([2], [[3]]),
    expect: is.deep.equal([2, 3]),
    info: 'No funky mathematics are happening',
  },
  {
    fn: () => flatten(['shallow'], [{ keeps: 'object' }]),
    expect: is.deep.equal(['shallow', { keeps: 'object' }]),
    info: 'Keep objects intact',
  },
  {
    fn: () => flatten(['test'], [[[[['moria']]]]]),
    expect: is.deep.equal(['test', 'moria']),
    info: 'Can descend to the deepest crypts of moria',
  },
  {
    fn: () => flatten(['test'], [[[[[date]]]]]),
    expect: is.deep.equal(['test', date]),
    info: 'Keep dates intact',
  },
  {
    fn: () => flatten(['test'], [[[[[date]]]]]),
    expect: a => a[1].getTime() === date.getTime(),
    info: 'Keep dates intact',
  },
  {
    fn: () => flatten(['test'], [[[[[() => {}]]]]]),
    expect: a => a[1].toString() === (() => {}).toString(),
    info: 'Keep functions intact',
  },
  {
    fn: () => flatten(['test'], [[[[[{ fn: () => {} }]]]]]),
    expect: a => is.deep.equal(a[1].fn, () => {}),
    info: 'Keep functions in objects intact',
  },
]

module.exports = fns
