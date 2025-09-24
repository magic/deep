import { is } from '@magic/test'
import { equal } from '../src/index.js'

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

const arrowFn = (a, b) => a + b
const arrowFnArray = (a, b) => [a, b]

const fns = [
  { fn: () => equal({}, {}), expect: true, info: 'two empty objects are equal' },
  { fn: () => equal({}, {}), expect: true, info: 'repeated test: two empty objects are equal' },
  { fn: () => equal(object, object), expect: true, info: 'same object reference is equal' },
  {
    fn: () => equal(object, otherObject),
    expect: true,
    info: 'different object references with same structure and values are equal',
  },
  { fn: () => equal(1, 1), expect: true, info: 'identical numbers are equal' },
  { fn: () => equal('string', 'string'), expect: true, info: 'identical strings are equal' },
  { fn: () => equal({}, ''), expect: false, info: 'object vs string are not equal' },
  {
    fn: () => equal({}, object),
    expect: false,
    info: 'empty object vs non-empty object are not equal',
  },
  { fn: () => equal(0, 0), expect: true, info: 'identical zeros are equal' },
  { fn: () => equal(0, 1), expect: false, info: 'different numbers are not equal' },
  {
    fn: () => equal(otherObject, differentObject),
    expect: false,
    info: 'objects with different values are not equal',
  },
  {
    fn: () => equal({ t: () => {} }, { t: function () {} }),
    expect: false,
    info: 'functions with different syntax are not equal',
  },
  {
    fn: () => equal({ t: fn }, { t: fn }),
    expect: true,
    info: 'identical function references are equal',
  },
  {
    fn: () => equal({ t: arrowFn }, { t: arrowFn }),
    expect: true,
    info: 'identical arrow functions are equal',
  },
  {
    fn: () => equal({ t: arrowFnArray }, { t: arrowFnArray }),
    expect: true,
    info: 'arrow functions returning identical arrays are equal',
  },
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
    info: 'functions with different bodies are not equal',
  },
  { fn: () => equal(fn, fn), expect: true, info: 'same function reference is equal' },
  { fn: () => equal('string', ['string']), expect: false, info: 'string vs array are not equal' },
  {
    fn: () => equal(buff, buff2),
    expect: false,
    info: 'buffers with different content are not equal',
  },
  { fn: () => equal(buff, buff), expect: true, info: 'same buffer reference is equal' },
  { fn: () => equal(buff, 'string'), expect: false, info: 'buffer vs string are not equal' },
  { fn: () => equal(prot1, prot1), expect: true, info: 'same prototype object is equal' },
  { fn: () => equal(prot1, prot2), expect: false, info: 'different prototypes are not equal' },
  { fn: () => equal(date, date), expect: true, info: 'same Date object is equal' },
  {
    fn: () => equal(date, new Date()),
    expect: false,
    info: 'different Date objects are not equal',
  },
  { fn: () => equal(date, ''), expect: false, info: 'Date vs string are not equal' },
  { fn: () => equal(null, null), expect: true, info: 'null vs null is equal' },
  { fn: () => equal(null), expect: is.function, info: 'one argument returns function (currying)' },
  { fn: () => equal(), expect: true, info: 'no arguments returns true' },
  { fn: () => equal(date, null), expect: false, info: 'Date vs null is not equal' },
  {
    fn: () => equal(date),
    expect: is.function,
    info: 'currying with one argument returns function',
  },
  { fn: () => ['test'], expect: equal(['test']), info: 'array with same string is equal' },
  {
    fn: () => ({ t: 't' }),
    expect: equal({ t: 't' }),
    info: 'objects with same key-value are equal',
  },
  { fn: () => equal(fn, fn), expect: true, info: 'two anonymous functions compared' },
  {
    fn: () => equal(() => {})(a => a),
    expect: false,
    info: 'curried function returns false when comparing different functions',
  },
  {
    fn: () => equal([])('test'),
    expect: false,
    info: 'empty array vs string in curried form is not equal',
  },
  {
    fn: () => equal({ t: 't' })(['test']),
    expect: false,
    info: 'object vs array in curried form is not equal',
  },
  { fn: () => equal(1, 2), expect: false, info: 'different numbers are not equal' },
]

export default fns
