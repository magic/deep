// Written by Substack <3

const { isBuffer, isUndefinedOrNull, isArguments } = require('types')

const equal = (actual, expected, opts = {}) => {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true
  }

  else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime()
  }

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected
  }

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  else {
    return objEquiv(actual, expected, opts)
  }
}

const objEquiv = (a, b, opts) => {
  let key
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
    return false
  }
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) {
    return false
  }

  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false
    }

    const pSlice = Array.prototype.slice

    a = pSlice.call(a)
    b = pSlice.call(b)
    return equal(a, b, opts)
  }

  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false
    }
    if (a.length !== b.length) {
      return false
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false
      }
    }

    return true
  }
  let ka
  let kb
  try {
    ka = Object.keys(a)
    kb = Object.keys(b)
  } catch (e) {//happens when one is a string literal and the other isn't
    return false
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) {
    return false
  }
  //the same set of keys (although not necessarily the same order),
  ka.sort()
  kb.sort()
  //~~~cheap key test
  for (let i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i]) {
      return false
    }
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (let i = ka.length - 1; i >= 0; i--) {
    key = ka[i]
    if (!equal(a[key], b[key], opts)) {
      return false
    }
  }

  return typeof a === typeof b
}

module.exports = equal
