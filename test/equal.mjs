import { is } from '@magic/test'

import { equal } from '../src/index.mjs'

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
  { fn: () => equal({}, {}), expect: true },
  { fn: () => equal({}, {}), expect: true },
  { fn: () => equal(object, object), expect: true },
  { fn: () => equal(object, otherObject), expect: true },
  { fn: () => equal(1, 1), expect: true },
  { fn: () => equal('string', 'string'), expect: true },
  { fn: () => equal({}, ''), expect: false },
  { fn: () => equal({}, object), expect: false },
  { fn: () => equal(0, 0), expect: true },
  { fn: () => equal(0, 1), expect: false },
  { fn: () => equal(otherObject, differentObject), expect: false },
  // functions do not compare as equal if their toString results are different
  { fn: () => equal({ t: () => {} }, { t: function() {} }), expect: false },
  { fn: () => equal({ t: () => {} }, { t: () => {} }), expect: true },
  { fn: () => equal({ t: (a, b) => a + b }, { t: (a, b) => a + b }), expect: true },
  { fn: () => equal({ t: (a, b) => [a, b] }, { t: (a, b) => [a, b] }), expect: true },
  {
    fn: () =>
      equal(
        {
          t: (a, b) => {
            a + b
          },
        },
        { t: (a, b) => a + b },
      ),
    expect: false,
  },
  { fn: () => equal(fn, fn), expect: true },
  { fn: () => equal('string', ['string']), expect: false },
  { fn: () => equal(buff, buff2), expect: false },
  { fn: () => equal(buff, buff), expect: true },
  { fn: () => equal(buff, 'string'), expect: false },
  // { fn: () => equal(arguments, arguments), expect: true },
  { fn: () => equal(prot1, prot1), expect: true },
  { fn: () => equal(prot1, prot2), expect: false },
  { fn: () => equal(date, date), expect: true },
  { fn: () => equal(date, new Date()), expect: false },
  { fn: () => equal(date, ''), expect: false },
  { fn: () => equal(null, null), expect: true },
  { fn: () => equal(null), expect: is.function },
  { fn: () => equal(), expect: false },
  { fn: () => equal(date, null), expect: false },
  // currying
  { fn: () => equal(date), expect: is.function },
  { fn: () => ['test'], expect: equal(['test']) },
  { fn: () => ({ t: 't' }), expect: equal({ t: 't' }) },
  { fn: () => () => {}, expect: equal(() => {}) },
  { fn: () => equal(() => {})(a => a), expect: false },
  { fn: () => equal([])('test'), expect: false },
  { fn: () => equal({ t: 't' })(['test']), expect: false },
  { fn: () => equal(1, 2), expect: false },
]

export default fns
