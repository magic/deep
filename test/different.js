const { is } = require('@magic/test')

const deep = require('../src')

const object = {
  string: 'string',
  number: 0,
  object: {
    string: '',
    boolean: false,
    boolean2: true,
  },
}

const otherObject = {
  string: 'string',
  number: 0,
  object: {
    string: '',
    boolean: false,
    boolean2: true,
  },
}

const differentObject = {
  string: 'string2',
  number: 0,
  object: {
    string: '',
    boolean: false,
    boolean2: true,
  },
}

const buff = Buffer.from('testing', 'utf8')
const buff2 = Buffer.from('testink', 'utf8')

const fn = () => {}

const prot1 = {}
prot1.prototype = Error

const prot2 = {}
prot2.prototype = Date

const date = new Date()

const fns = [
  { fn: () => deep.different({}, {}), expect: false },
  { fn: () => deep.different({}, {}), expect: false },
  { fn: () => deep.different(object, object), expect: false },
  { fn: () => deep.different(object, otherObject), expect: false },
  { fn: () => deep.different(1, 1), expect: false },
  { fn: () => deep.different('string', 'string'), expect: false },
  { fn: () => deep.different({}, ''), expect: true },
  { fn: () => deep.different({}, object), expect: true },
  { fn: () => deep.different(0, 0), expect: false },
  { fn: () => deep.different(0, 1), expect: true },
  { fn: () => deep.different(otherObject, differentObject), expect: true },
  // functions do not compare as equal if their toString results are different
  { fn: () => deep.different({ t: () => {} }, { t: function() {} }), expect: true },
  { fn: () => deep.different({ t: () => {} }, { t: () => {} }), expect: false },
  { fn: () => deep.different({ t: (a, b) => a + b }, { t: (a, b) => a + b }), expect: false },
  { fn: () => deep.different({ t: (a, b) => [a, b] }, { t: (a, b) => [a, b] }), expect: false },
  {
    fn: () =>
      deep.different(
        {
          t: (a, b) => {
            a + b
          },
        },
        { t: (a, b) => a + b },
      ),
    expect: true,
  },
  { fn: () => deep.different(fn, fn), expect: false },
  { fn: () => deep.different('string', ['string']), expect: true },
  { fn: () => deep.different(buff, buff2), expect: true },
  { fn: () => deep.different(buff, buff), expect: false },
  { fn: () => deep.different(buff, 'string'), expect: true },
  { fn: () => deep.different(arguments, arguments), expect: false },
  { fn: () => deep.different(prot1, prot1), expect: false },
  { fn: () => deep.different(prot1, prot2), expect: true },
  { fn: () => deep.different(date, date), expect: false },
  { fn: () => deep.different(date, new Date()), expect: true },
  { fn: () => deep.different(date, ''), expect: true },
  { fn: () => deep.different(null, null), expect: false },
  { fn: () => deep.different(null), expect: is.function },
  { fn: () => deep.different(), expect: false },
  { fn: () => deep.different(date, null), expect: true },
  // currying
  { fn: () => deep.different(date), expect: is.function, info: 'returns function if 1 arg passed' },
  { fn: ['test'], expect: deep.different(['test2']), info: 'arrays differ by value' },
  { fn: ['test'], expect: deep.different(['test', 2]), info: 'arrays differ by length' },
  { fn: () => ({ t: 't' }), expect: deep.different({ t: 't2' }), info: 'objects differ by value' },
  { fn: () => ({ t: 't' }), expect: deep.different({ t2: 't' }), info: 'objects differ by key' },
  { fn: () => () => {}, expect: deep.different(a => a), info: 'functions get string compared' },
  { fn: () => deep.different(() => {})(a => a), expect: true },
  { fn: () => deep.different([])('test'), expect: true },
  { fn: () => deep.different({ t: 't' })(['test']), expect: true },
]

module.exports = fns
