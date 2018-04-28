const is = require('@magic/types')

const mergeArray = (a1 = [], a2 = []) => {
  if (is.array(a1) && !is.array(a2)) {
    return [...a1, a2]
  }

  const aa = a1.map((val1, key) => {
    if (!a2.hasOwnProperty(key)) {
      return val1
    }

    const val2 = a2[key]

    if (is.array(val1)) {
      return deepMerge(val1, val2)
    }

    return val2
  })

  return aa
}

const mergeObject = (o1 = {}, o2 = {}) => {
  const final = {}
  const entries = Object.entries({ ...o1, ...o2 })

  entries.forEach(([key, val1]) => {
    const val2 = o2[key]

    if (is.object(val1)) {
      if (!is.object(val2)) {
        final[key] = val1
        return
      }

      final[key] = mergeObject(val1, val2)
      return
    }

    const finalVal = is.defined(val2) ? val2 : val1
    final[key] = finalVal
  })

  return final
}

const deepMerge = (o1, o2 = {}) => {
  if (is.empty(o1) || !is.defined(o1)) {
    return o2
  }

  if (is.empty(o2)) {
    return o1
  }

  if (is.array(o1)) {
    return mergeArray(o1, o2)
  } else if (is.object(o1)) {
    return mergeObject(o1, o2)
  }

  return {}
}

module.exports = deepMerge
