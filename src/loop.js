const { isObject, isDate, isError, isFunction } = require('types')

const loop = (items, fn) => {
  if (!isFunction(fn)) {
    return items
  }

  if (!isObject(items) && !isDate(items) && !isError(items)) {
    return fn(items)
  }

  const loopedItems = {}
  Object.keys(items).forEach(k => {
    loopedItems[k] = loop(items[k], fn)
  })

  return loopedItems
}

module.exports = loop
