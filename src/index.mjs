import { equal as eq } from './equal.mjs'
import { different as di } from './different.mjs'

import { loop as lo } from './loop.mjs'
import { merge as me } from './merge.mjs'
import { flatten as fl } from './flatten.mjs'

export const equal = eq
export const equals = eq
export const different = di
export const diff = di

export const flatten = fl
export const loop = lo
export const merge = me

export default {
  equal,
  equals,
  eq,
  different,
  diff,
  flatten,
  loop,
  merge,
}
