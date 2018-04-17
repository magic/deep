const is = require('@magic/types')

const loop = (fn, items) => {
  if (!is.function(fn) && is.function(items)) {
    console.log('switch', { fn, items })
    const fns = fn
    fn = items
    items = fns
  }

  if (!is.function(fn)) {
    return items
  }

  if (!items) {
    return
  }

  if (!is.function(items.map)) {
    return fn(items)
  }

  return items.map(arg => loop(fn, arg))
}

module.exports = loop
