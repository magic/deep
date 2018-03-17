const deep = require('../src')

const fns = [
  { fn: () => deep.objEqual({ t: 't'}, { t: 't' }), expect: true },
  { fn: () => deep.objEqual({}), expect: false },
  { fn: () => deep.objEqual({ t: 't'}), expect: false },
  { fn: () => deep.objEqual({ t: 't'}, ['t']), expect: false },
  { fn: () => deep.objEqual({ t: 't'}, null), expect: false },
  { fn: () => deep.objEqual(Buffer.from('t'), Buffer.from('t')), expect: true },
  { fn: () => deep.objEqual(Buffer.from('t'), Buffer.from('tt')), expect: false },
  { fn: () => deep.objEqual(Buffer.from('t'), 't'), expect: false },
  { fn: () => deep.objEqual(0, 't'), expect: false },
]

module.exports = fns
