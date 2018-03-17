// Written by Substack <3

const { isBuffer, isUndefinedOrNull, isDate, isObject } = require('types')

const equal = (actual, expected = {}) => {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true
  }

  if (isDate(actual)) {
    if (!isDate(expected)) {
      return false
    }

    return actual.getTime() === expected.getTime()
  }

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  if (!actual || !expected) {
    return actual === expected
  }

  if (!isObject(actual) || !isObject(expected)) {
    return actual === expected
  }

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  return objEqual(actual, expected)
}

const objEqual = (a, b) => {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
    return false
  }

  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) {
    return false
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

  const ka = Object.keys(a)
  const kb = Object.keys(b)

  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length) {
    return false
  }
  // the same set of keys (although not necessarily the same order),
  ka.sort()
  kb.sort()
  // ~~~cheap key test
  for (let i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i]) {
      return false
    }
  }

  // equivalent values for every corresponding key, and
  // ~~~possibly expensive deep test
  let key
  for (let i = ka.length - 1; i >= 0; i--) {
    key = ka[i]
    if (!equal(a[key], b[key])) {
      return false
    }
  }

  return typeof a === typeof b
}

module.exports = {
  equal,
  objEqual,
}
