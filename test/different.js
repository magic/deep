import { is } from '@magic/test'
import { different } from '../src/index.js'

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

const arrowFnEmpty = () => {}
const arrowFn = (a, b) => a + b
const arrowFnArray = (a, b) => [a, b]

const fns = [
  { fn: () => different({}, {}), expect: false, info: 'two empty objects are not different' },
  {
    fn: () => different({}, {}),
    expect: false,
    info: 'repeated test: two empty objects are not different',
  },
  {
    fn: () => different(object, object),
    expect: false,
    info: 'identical objects are not different',
  },
  {
    fn: () => different(object, otherObject),
    expect: false,
    info: 'objects with same structure and values are not different',
  },
  { fn: () => different(1, 1), expect: false, info: 'identical numbers are not different' },
  {
    fn: () => different('string', 'string'),
    expect: false,
    info: 'identical strings are not different',
  },
  { fn: () => different({}, ''), expect: true, info: 'object vs string is different' },
  {
    fn: () => different({}, object),
    expect: true,
    info: 'empty object vs non-empty object is different',
  },
  { fn: () => different(0, 0), expect: false, info: 'identical zeros are not different' },
  { fn: () => different(0, 1), expect: true, info: 'different numbers are different' },
  {
    fn: () => different(otherObject, differentObject),
    expect: true,
    info: 'objects with different values are different',
  },
  {
    fn: () => different({ t: arrowFnEmpty }, { t: function () {} }),
    expect: true,
    info: 'different function syntax yields difference',
  },
  {
    fn: () => different({ t: arrowFnEmpty }, { t: arrowFnEmpty }),
    expect: false,
    info: 'identical arrow functions are not different',
  },
  {
    fn: () => different({ t: arrowFn }, { t: arrowFn }),
    expect: false,
    info: 'identical arrow functions with params are not different',
  },
  {
    fn: () => different({ t: arrowFnArray }, { t: arrowFnArray }),
    expect: false,
    info: 'arrow functions returning arrays are identical',
  },
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
    info: 'arrow function bodies differ',
  },
  {
    fn: () => different(fn, fn),
    expect: false,
    info: 'identical function references are not different',
  },
  { fn: () => different('string', ['string']), expect: true, info: 'string vs array is different' },
  {
    fn: () => different(buff, buff2),
    expect: true,
    info: 'buffers with different contents are different',
  },
  { fn: () => different(buff, buff), expect: false, info: 'identical buffers are not different' },
  { fn: () => different(buff, 'string'), expect: true, info: 'buffer vs string is different' },
  {
    fn: () => different(prot1, prot1),
    expect: false,
    info: 'identical prototype objects are not different',
  },
  { fn: () => different(prot1, prot2), expect: true, info: 'different prototypes are different' },
  { fn: () => different(date, date), expect: false, info: 'same Date object is not different' },
  {
    fn: () => different(date, new Date()),
    expect: true,
    info: 'different Date objects are different',
  },
  { fn: () => different(date, ''), expect: true, info: 'Date vs string is different' },
  { fn: () => different(null, null), expect: false, info: 'null vs null is not different' },
  {
    fn: () => different(null),
    expect: is.function,
    info: 'one argument returns a function (currying)',
  },
  { fn: () => different(), expect: false, info: 'no arguments returns false' },
  { fn: () => different(date, null), expect: true, info: 'Date vs null is different' },
  {
    fn: () => different(date),
    expect: is.function,
    info: 'currying with one argument returns a function',
  },
  { fn: ['test'], expect: different(['test2']), info: 'arrays differ by value' },
  { fn: ['test'], expect: different(['test', 2]), info: 'arrays differ by length' },
  { fn: () => ({ t: 't' }), expect: different({ t: 't2' }), info: 'objects differ by value' },
  { fn: () => ({ t: 't' }), expect: different({ t2: 't' }), info: 'objects differ by key' },
  { fn: () => () => {}, expect: different(a => a), info: 'functions compared by string content' },
  {
    fn: () => different(() => {})(a => a),
    expect: true,
    info: 'different functions return true when curried',
  },
  {
    fn: () => different([])('test'),
    expect: true,
    info: 'empty array vs string is different when curried',
  },
  {
    fn: () => different({ t: 't' })(['test']),
    expect: true,
    info: 'object vs array is different when curried',
  },
]

export default fns
