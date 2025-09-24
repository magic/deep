import is from '@magic/types'

/**
 * Recursively merges two values or objects.
 *
 * @template T
 * @template U
 * @param {T} o1 - First value or object.
 * @param {U} o2 - Second value or object.
 * @returns {any} Merged result.
 */
export const merge = (o1, o2) => {
  if (is.undefined(o1)) {
    return o2
  } else if (is.undefined(o2)) {
    return o1
  }

  if (is.array(o1)) {
    return is.array(o2)
      ? /** @type {any[]} */ (o1).concat(/** @type {any[]} */ (o2))
      : /** @type {any[]} */ (o1).concat([o2])
  } else if (is.array(o2)) {
    return [o1].concat(/** @type {any[]} */ (o2))
  }

  if (is.mergeable(o1) && is.mergeable(o2)) {
    const keys = Object.keys({ ...o1, ...o2 })
    const final = /** @type {Record<string, any>} */ ({})
    keys.forEach(key => {
      if (!is.function(o2.hasOwnProperty) || !o2.hasOwnProperty(key)) {
        final[key] = o1[key]
      } else {
        final[key] = merge(o1[key], o2[key])
      }
    })
    return final
  }

  if (!is.mergeable(o1) && !is.mergeable(o2)) {
    return o2
  }

  return [o1, o2]
}

export default merge
