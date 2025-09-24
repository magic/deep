import is from '@magic/types'

/**
 * Recursively applies a function to items or transforms items based on conditions.
 *
 * @template T, R
 * @param {((item: T) => R) | T} fn - Function to apply or the first item.
 * @param {...any} items - Items to loop over (can be nested arrays).
 * @returns {any} The transformed result, array of results, or undefined.
 */
export const loop = (fn, ...items) => {
  // If no arguments, return undefined
  if (!fn && items.length === 0) {
    return undefined
  }

  // If only function provided, return undefined
  if (is.function(fn) && items.length === 0) {
    return undefined
  }

  let targets = items

  // Check for argument swapping: if fn is not a function but we have items and one of them is a function
  if (!is.function(fn) && items.length > 0) {
    const functionIndex = items.findIndex(item => is.function(item))
    if (functionIndex !== -1) {
      // Swap: fn becomes the target, and the function becomes fn
      const actualFn = items[functionIndex]
      targets = [fn, ...items.slice(0, functionIndex), ...items.slice(functionIndex + 1)]
      fn = actualFn
    }
  }

  // Handle the case where we have multiple items but one of them is an object (options)
  if (is.array(targets) && targets.length > 1) {
    // Check if any item is an object (options pattern)
    const hasOptions = targets.some(item => is.object(item) && !is.array(item))

    if (hasOptions && is.function(fn)) {
      // Apply function to each item
      return targets.map(item => {
        if (is.array(item)) {
          return item.map(subItem => loop(fn, subItem))
        }
        return is.object(item) && !is.array(item)
          ? item
          : /** @type {(item: any) => any} */ (fn)(item)
      })
    }

    if (!is.function(fn)) {
      return [fn, ...targets]
    }

    // Apply function to multiple items
    return targets.map(item => {
      if (is.array(item)) {
        return item.map(subItem => loop(fn, subItem))
      }
      return /** @type {(item: any) => any} */ (fn)(item)
    })
  }

  // Single item case - if targets is an array with one element, unwrap it
  if (is.array(targets) && targets.length === 1) {
    targets = /** @type {any} */ (targets[0])
  }

  // If fn is not a function, return tuple
  if (!is.function(fn)) {
    return [fn, targets]
  }

  // If targets is null/undefined, apply function directly
  if (!targets) {
    return fn(targets)
  }

  // If targets has map method (is array-like), map over it
  if (is.array(targets)) {
    return targets.map(item => {
      if (is.array(item)) {
        return loop(fn, item)
      }
      return /** @type {(item: any) => any} */ (fn)(item)
    })
  }

  // For non-array targets, apply function directly
  return /** @type {(item: any) => any} */ (fn)(targets)
}

export default loop
