const { is } = require('@magic/test')

const { different } = require('../src')

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
  { fn: () => different({}, {}), expect: false },
  { fn: () => different({}, {}), expect: false },
  { fn: () => different(object, object), expect: false },
  { fn: () => different(object, otherObject), expect: false },
  { fn: () => different(1, 1), expect: false },
  { fn: () => different('string', 'string'), expect: false },
  { fn: () => different({}, ''), expect: true },
  { fn: () => different({}, object), expect: true },
  { fn: () => different(0, 0), expect: false },
  { fn: () => different(0, 1), expect: true },
  { fn: () => different(otherObject, differentObject), expect: true },
  // functions do not compare as equal if their toString results are different
  { fn: () => different({ t: () => {} }, { t: function() {} }), expect: true },
  { fn: () => different({ t: () => {} }, { t: () => {} }), expect: false },
  { fn: () => different({ t: (a, b) => a + b }, { t: (a, b) => a + b }), expect: false },
  { fn: () => different({ t: (a, b) => [a, b] }, { t: (a, b) => [a, b] }), expect: false },
  {
    fn: () =>
      different(
        {
          t: (a, b) => {
            a + b
          },
        },
        { t: (a, b) => a + b },
      ),
    expect: true,
  },
  { fn: () => different(fn, fn), expect: false },
  { fn: () => different('string', ['string']), expect: true },
  { fn: () => different(buff, buff2), expect: true },
  { fn: () => different(buff, buff), expect: false },
  { fn: () => different(buff, 'string'), expect: true },
  { fn: () => different(arguments, arguments), expect: false },
  { fn: () => different(prot1, prot1), expect: false },
  { fn: () => different(prot1, prot2), expect: true },
  { fn: () => different(date, date), expect: false },
  { fn: () => different(date, new Date()), expect: true },
  { fn: () => different(date, ''), expect: true },
  { fn: () => different(null, null), expect: false },
  { fn: () => different(null), expect: is.function },
  { fn: () => different(), expect: false },
  { fn: () => different(date, null), expect: true },
  // currying
  { fn: () => different(date), expect: is.function, info: 'returns function if 1 arg passed' },
  { fn: ['test'], expect: different(['test2']), info: 'arrays differ by value' },
  { fn: ['test'], expect: different(['test', 2]), info: 'arrays differ by length' },
  { fn: () => ({ t: 't' }), expect: different({ t: 't2' }), info: 'objects differ by value' },
  { fn: () => ({ t: 't' }), expect: different({ t2: 't' }), info: 'objects differ by key' },
  { fn: () => () => {}, expect: different(a => a), info: 'functions get string compared' },
  { fn: () => different(() => {})(a => a), expect: true },
  { fn: () => different([])('test'), expect: true },
  { fn: () => different({ t: 't' })(['test']), expect: true },
]

module.exports = fns
