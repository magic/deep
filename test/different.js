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

const arrowFn = () => {}
const arrowFnWithArguments = (a, b) => a + b
const arrowFnReturningArray = (a, b) => [a, b]

export default [
  { fn: () => different({}, {}), expect: false, info: 'empty objects are not different' },
  {
    fn: () => different({}, {}),
    expect: false,
    info: 'empty objects are not different (duplicate test)',
  },
  {
    fn: () => different(object, object),
    expect: false,
    info: 'same object reference is not different',
  },
  {
    fn: () => different(object, otherObject),
    expect: false,
    info: 'objects with same structure and values are not different',
  },
  { fn: () => different(1, 1), expect: false, info: 'same numbers are not different' },
  {
    fn: () => different('string', 'string'),
    expect: false,
    info: 'same strings are not different',
  },
  { fn: () => different({}, ''), expect: true, info: 'object and string are different' },
  {
    fn: () => different({}, object),
    expect: true,
    info: 'empty object and populated object are different',
  },
  { fn: () => different(0, 0), expect: false, info: 'same zero values are not different' },
  { fn: () => different(0, 1), expect: true, info: 'different numbers are different' },
  {
    fn: () => different(otherObject, differentObject),
    expect: true,
    info: 'objects with different values are different',
  },
  // functions do not compare as different if their toString results are different
  {
    fn: () => different({ t: arrowFn }, { t: function () {} }),
    expect: true,
    info: 'arrow function and regular function are different',
  },
  {
    fn: () => different({ t: arrowFn }, { t: arrowFn }),
    expect: false,
    info: 'identical arrow functions are not different',
  },
  {
    fn: () => different({ t: arrowFnWithArguments }, { t: arrowFnWithArguments }),
    expect: false,
    info: 'identical function expressions are not different',
  },
  {
    fn: () => different({ t: arrowFnReturningArray }, { t: arrowFnReturningArray }),
    expect: false,
    info: 'identical functions returning arrays are not different',
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
    info: 'functions with different body formatting are different',
  },
  {
    fn: () => different(fn, fn),
    expect: false,
    info: 'same function reference is not different',
  },
  {
    fn: () => different('string', ['string']),
    expect: true,
    info: 'string and array containing string are different',
  },
  {
    fn: () => different(buff, buff2),
    expect: true,
    info: 'buffers with different content are different',
  },
  {
    fn: () => different(buff, buff),
    expect: false,
    info: 'same buffer reference is not different',
  },
  {
    fn: () => different(buff, 'string'),
    expect: true,
    info: 'buffer and string are different',
  },
  //   { fn: () => different(arguments, arguments), expect: false },
  {
    fn: () => different(prot1, prot1),
    expect: false,
    info: 'same object with prototype reference is not different',
  },
  {
    fn: () => different(prot1, prot2),
    expect: true,
    info: 'objects with different prototypes are different',
  },
  {
    fn: () => different(date, date),
    expect: false,
    info: 'same date reference is not different',
  },
  {
    fn: () => different(new Date(-1000), new Date()),
    expect: true,
    info: 'different date instances are different',
  },
  {
    fn: () => different(date, ''),
    expect: true,
    info: 'date and empty string are different',
  },
  { fn: () => different(null, null), expect: false, info: 'null values are not different' },
  {
    fn: () => different(null),
    expect: is.function,
    info: 'calling with null returns a function (currying)',
  },
  {
    fn: () => different(),
    expect: false,
    info: 'calling without arguments returns false (both undefined)',
  },
  {
    fn: () => different(undefined),
    expect: is.function,
    info: 'calling with undefined returns a function (currying)',
  },
  { fn: () => different(date, null), expect: true, info: 'date and null are different' },
  // currying
  {
    fn: () => different(date),
    expect: is.function,
    info: 'calling with one argument returns a function (currying)',
  },
  {
    fn: () => different(['test2'])(['test']),
    expect: true,
    info: 'curried function with different arrays returns true',
  },
  {
    fn: () => different(['test'])(['test']),
    expect: false,
    info: 'curried function with matching arrays returns false',
  },
  {
    fn: () => different({ t: 't2' })({ t: 't' }),
    expect: true,
    info: 'curried function with different objects returns true',
  },
  {
    fn: () => different({ t: 't' })({ t: 't' }),
    expect: false,
    info: 'curried function with matching objects returns false',
  },
  {
    fn: () => different(() => ({}))(arrowFn),
    expect: true,
    info: 'curried function with different functions returns true',
  },
  {
    fn: () => different(arrowFn)(a => a),
    expect: true,
    info: 'curried function with different function signatures returns true',
  },
  {
    fn: () => different([])('test'),
    expect: true,
    info: 'curried empty array compared with string returns true',
  },
  {
    fn: () => different({ t: 't' })(['test']),
    expect: true,
    info: 'curried object compared with array returns true',
  },

  {
    fn: () => different('string', 1),
    expect: true,
    info: 'string and number are different',
  },
  {
    fn: () => different(undefined, null),
    expect: true,
    info: 'undefined and null are different',
  },
  {
    fn: () => different(true, false),
    expect: true,
    info: 'different booleans are different',
  },
  { fn: () => different([], []), expect: false, info: 'empty arrays are not different' },
  {
    fn: () => different([1, 2], [1, 2]),
    expect: false,
    info: 'arrays with same elements in same order are not different',
  },
  {
    fn: () => different([1, 2], [2, 1]),
    expect: false,
    info: 'arrays with same elements in different order are not different',
  },
  {
    fn: () => different({ a: { b: 1 } }, { a: { b: 1 } }),
    expect: false,
    info: 'nested objects with same structure are not different',
  },
  {
    fn: () => different({ a: { b: 1 } }, { a: { b: 2 } }),
    expect: true,
    info: 'nested objects with different values are different',
  },
  {
    fn: () => different(Buffer.from(''), Buffer.from('')),
    expect: false,
    info: 'empty buffers are not different',
  },
  {
    fn: () => different(Buffer.from('a'), Buffer.from('b')),
    expect: true,
    info: 'single character buffers with different content are different',
  },

  // Test currying edge cases
  {
    fn: () => different('test')('test'),
    expect: false,
    info: 'curried function with same strings returns false',
  },
  {
    fn: () => different('test')('different'),
    expect: true,
    info: 'curried function with different strings returns true',
  },
  {
    fn: () => different(123)(123),
    expect: false,
    info: 'curried function with same numbers returns false',
  },
  {
    fn: () => different(123)(456),
    expect: true,
    info: 'curried function with different numbers returns true',
  },
]
