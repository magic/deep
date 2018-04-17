const deep = require('../src')

const s = t => JSON.stringify(t)

const date = new Date()

const fns = [
  {
    fn: () => s(deep.flatten(['shallow'], [['deep']])),
    expect: s(['shallow', 'deep']),
    info: 'Flatten an array',
  },
  {
    fn: () => s(deep.flatten([2], [[3]])),
    expect: s([2, 3]),
    info: 'No funky mathematics',
  },
  {
    fn: () => s(deep.flatten(['shallow'], [{ keeps: 'object' }])),
    expect: s(['shallow', { keeps: 'object' }]),
    info: 'Keep objects intact',
  },
  {
    fn: () => s(deep.flatten(['test'], [[[[['moria']]]]])),
    expect: s(['test', 'moria']),
    info: 'Can descend to the deepest crypts of moria',
  },
  {
    fn: () => s(deep.flatten(['test'], [[[[[date]]]]])),
    expect: s(['test', date]),
    info: 'Keep dates intact',
  },
  {
    fn: () => deep.flatten(['test'], [[[[[date]]]]]),
    expect: a => a[1].getTime() === date.getTime(),
    info: 'Keep dates intact',
  },
  {
    fn: () => deep.flatten(['test'], [[[[[() => {}]]]]]),
    expect: a => a[1].toString() === (() => {}).toString(),
    info: 'Keep functions intact',
  },
  {
    fn: () => deep.flatten(['test'], [[[[[{ fn: () => {} }]]]]]),
    expect: a => a[1].fn.toString() === (() => {}).toString(),
    info: 'Keep functions in objects intact',
  },
]

module.exports = fns
