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
const buff2 = Buffer.from('testinkkk', 'utf8')

const fn = () => {}

const prot1 = {}
prot1.prototype = Error

const prot2 = {}
prot2.prototype = Date

const date = new Date()

const fns = [
  { fn: () => deep.equal({}, {}), expect: true },
  { fn: () => deep.equal({}, {}), expect: true },
  { fn: () => deep.equal(object, object), expect: true },
  { fn: () => deep.equal(object, otherObject), expect: true },
  { fn: () => deep.equal(1, 1), expect: true },
  { fn: () => deep.equal('string', 'string'), expect: true },
  { fn: () => deep.equal({}, ''), expect: false },
  { fn: () => deep.equal({}, object), expect: false },
  { fn: () => deep.equal(0, 0), expect: true },
  { fn: () => deep.equal(0, 1), expect: false },
  { fn: () => deep.equal(otherObject, differentObject), expect: false },
  // functions do not compare as equal if their toString results are different
  { fn: () => deep.equal({ t: () => {} }, { t: function() {} }), expect: false },
  { fn: () => deep.equal({ t: () => {} }, { t: () => {} }), expect: true },
  { fn: () => deep.equal({ t: (a, b) => a + b }, { t: (a, b) => a + b }), expect: true },
  { fn: () => deep.equal({ t: (a, b) => [a, b] }, { t: (a, b) => [a, b] }), expect: true },
  {
    fn: () =>
      deep.equal(
        {
          t: (a, b) => {
            a + b
          },
        },
        { t: (a, b) => a + b },
      ),
    expect: false,
  },
  { fn: () => deep.equal(fn, fn), expect: true },
  { fn: () => deep.equal('string', ['string']), expect: false },
  { fn: () => deep.equal(buff, buff2), expect: false },
  { fn: () => deep.equal(buff, buff), expect: true },
  { fn: () => deep.equal(buff, 'string'), expect: false },
  { fn: () => deep.equal(arguments, arguments), expect: true },
  { fn: () => deep.equal(prot1, prot1), expect: true },
  { fn: () => deep.equal(prot1, prot2), expect: false },
  { fn: () => deep.equal(date, date), expect: true },
  { fn: () => deep.equal(date, new Date()), expect: false },
  { fn: () => deep.equal(date, ''), expect: false },
  { fn: () => deep.equal(null, null), expect: true },
  { fn: () => deep.equal(null), expect: is.function },
  { fn: () => deep.equal(), expect: false },
  { fn: () => deep.equal(date, null), expect: false },
  // currying
  { fn: () => deep.equal(date), expect: is.function },
  { fn: () => ['test'], expect: deep.equal(['test']) },
  { fn: () => ({ t: 't' }), expect: deep.equal({ t: 't' }) },
  { fn: () => () => {}, expect: deep.equal(() => {}) },
  { fn: () => deep.equal(() => {})(a => a), expect: false },
  { fn: () => deep.equal([])('test'), expect: false },
  { fn: () => deep.equal({ t: 't' })(['test']), expect: false },
  { fn: () => deep.equal(1, 2), expect: false }
]

module.exports = fns
