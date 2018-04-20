const is = require('@magic/types')

const loop = (fn, ...items) => {
  if (is.empty(items)) {
    return fn(items)
  } else if (items.length === 1) {
    items = items[0]
  }

  if (!is.function(fn) && is.function(items)) {
    const oldFn = fn
    fn = items
    items = oldFn
  }

  if (!is.function(fn)) {
    return items
  }

  if (!items) {
    return fn(items)
  }

  if (!is.function(items.map)) {
    return fn(items)
  }

  return items.map(item => loop(fn, item))
}

module.exports = loop
