const is = require('@magic/types')

const equal = require('./equal')

const different = (a, b) => {
  if (is.undefined(b)) {
    if (is.undefined(a)) {
      // this most likely is an argument error.
      return false
    }

    return c => different(a, c)
  }

  return !equal(a, b)
}

module.exports = different
