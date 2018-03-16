const run = require('test')

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

const buff = new Buffer('testing')
const buff2 = new Buffer('testink')

const fn = () => {}

const fns = [
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
  // functions do not compare as equal
  { fn: () => deep.equal({t: () => {}}, {t: function () {}}), expect: false },
  { fn: () => deep.equal({t: () => {}}, {t: () => {}}), expect: false },
  { fn: () => deep.equal(fn, fn), expect: true },
  { fn: () => deep.equal('string', ['string']), expect: false, },
  { fn: () => deep.equal(buff, buff2), expect: false, },
  { fn: () => deep.equal(buff, buff), expect: true, },
  { fn: () => deep.equal(buff, 'string'), expect: false, },
]

module.exports = fns
