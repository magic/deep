import { is } from '@magic/test'
import { loop } from '../src/index.js'

const fns = [
  {
    fn: () => loop(e => e, ['test']),
    expect: is.array,
    info: 'Basic loop over array returns an array',
  },
  {
    fn: () => loop(e => e, ['test'], {})[0][0],
    expect: 'test',
    info: 'First element of nested loop matches input',
  },
  {
    fn: () => loop(e => e, ['test'], {})[1],
    expect: is.object,
    info: 'Second element is the options object',
  },
  {
    fn: () => loop(e => e, ['test'], {}),
    expect: is.object,
    info: 'Loop returns object when options are given',
  },
  { fn: () => loop(), expect: undefined, info: 'Calling loop with no arguments returns undefined' },
  {
    fn: () => loop(() => 1, ['t', 't2', ['t3']]),
    expect: is.deep.equal([1, 1, [1]]),
    info: 'Function as first argument applies mapping over array with nested structure',
  },
  {
    fn: () => loop(['test', 'test2', ['test3']], () => 1),
    expect: is.deep.equal([1, 1, [1]]),
    info: 'Function as second argument maps over array with nested structure',
  },
  {
    fn: () => loop(() => 1, ['str', 'str2', ['str3']]),
    expect: is.deep.equal([1, 1, [1]]),
    info: 'Loop replaces all elements in array with function result',
  },
  { fn: () => loop(a => a, []), expect: is.array, info: 'Loop over empty array returns array' },
  {
    fn: () => loop(a => a, []),
    expect: is.empty,
    info: 'Loop over empty array returns empty result',
  },
  {
    fn: () => loop(a => a),
    expect: undefined,
    info: 'Loop with only a function returns undefined',
  },
  { fn: () => loop(), expect: undefined, info: 'Loop with no arguments returns undefined' },
  {
    fn: () => loop({ t: 't' }, 'test'),
    expect: is.deep.equal([{ t: 't' }, 'test']),
    info: 'Loop over object and string returns array of both',
  },
  {
    fn: () => loop(a => a + 1, 1, 2),
    expect: is.deep.equal([2, 3]),
    info: 'Loop increments numbers',
  },
  {
    fn: () => loop(['test'], a => a),
    expect: is.deep.equal(['test']),
    info: 'Loop returns same array if function returns same value',
  },
  {
    fn: () => loop(e => e + 1, [1, 2, [3]]),
    expect: is.deep.equal([2, 3, [4]]),
    info: 'Loop increments numbers including nested arrays',
  },
  {
    fn: () => loop([2, 3, [1]], e => e + 1),
    expect: is.deep.equal([3, 4, [2]]),
    info: 'Loop increments numbers including nested array elements',
  },
  {
    fn: () =>
      loop(
        () => true,
        () => false,
      ),
    info: 'First function wraps second function without additional arguments',
  },
  {
    fn: () =>
      loop(
        () => true,
        () => false,
      ),
    info: 'Repeat test for first function wrapping second function',
  },
  {
    fn: () =>
      loop(
        () => true,
        false,
        () => false,
      ),
    expect: is.deep.equal([true, true]),
    info: 'First function wraps all arguments, returning array of true values',
  },
  {
    fn: () => loop('a', 'b', 'c'),
    expect: is.deep.equal(['a', 'b', 'c']),
    info: 'Returns tuple array when fn is not a function and multiple items are provided',
  },
  {
    fn: () => loop('notAFunction', 1, 2, 3),
    expect: is.deep.equal(['notAFunction', 1, 2, 3]),
    info: 'Handles non-function fn with no function found in items',
  },
  {
    fn: () => loop(a => a, undefined),
    expect: undefined,
    info: 'Handles undefined target gracefully by returning fn(undefined)',
  },
  {
    fn: () => loop('notAFunction', 'x', 'y'),
    expect: is.deep.equal(['notAFunction', 'x', 'y']),
    info: 'Handles case where fn is not a function and items contain no function (no swap performed)',
  },
  {
    fn: () => loop('noFnHere', 'stillNoFn', ['nested', 'array']),
    expect: is.deep.equal(['noFnHere', 'stillNoFn', ['nested', 'array']]),
    info: 'Covers branch where fn is not a function and no function exists in items (functionIndex === -1)',
  },
]

export default fns
