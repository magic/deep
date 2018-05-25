const { is } = require('@magic/test')

const merge = require('../src/merge')

module.exports = [
  { fn: () => merge([1], 2), expect: is.deep.eq([1, 2]) },
  { fn: () => merge([1, [2]], 3), expect: is.deep.eq([1, [2], 3]) },
  { fn: () => merge([1, { k: 2 }], 3), expect: is.deep.eq([1, { k: 2 }, 3]) },
  { fn: () => merge([1, new Date(23)], 3), expect: is.deep.eq([1, new Date(23), 3]) },
  { fn: () => merge([1, /test/], 3), expect: is.deep.eq([1, /test/, 3]) },
  { fn: () => merge([1, a => a], 3), expect: is.deep.eq([1, a => a, 3]) },
  { fn: () => merge(1, [2]), expect: is.deep.eq([1, 2]) },
  { fn: () => merge(1, [2, { t: 3 }]), expect: is.deep.eq([1, 2, { t: 3 }]) },
  { fn: () => merge(1, [2, { t: 3 }]), expect: is.deep.eq([1, 2, { t: 3 }]) },
  { fn: () => merge({ t: 3 }, { t: 3 }), expect: is.deep.eq({ t: 3 }) },
  { fn: () => merge(undefined, { t: 3 }), expect: is.deep.eq({ t: 3 }) },
  {
    fn: () => merge({ t: { t: 4 } }, { t: { t: 3, tt: 2 } }),
    expect: is.deep.eq({ t: { t: 3, tt: 2 } }),
  },
  {
    fn: () => merge({ t: { t: 4 } }, { t: { tt: 2 } }),
    expect: is.deep.eq({ t: { t: 4, tt: 2 } }),
  },
  { fn: () => merge({ t: { t: 4 } }, 'test'), expect: is.deep.eq([{ t: { t: 4 } }, 'test']) },
  { fn: () => merge({ t: { t: 4 } }), expect: is.deep.eq({ t: { t: 4 } }) },
]
