import is from '@magic/types'

/**
 * Flattens one level of an array if input is an array, otherwise returns the input as-is.
 *
 * @template T
 * @param {T | T[]} flat - An array or value to flatten.
 * @returns {T[]} The flattened value or array.
 */
export const shallow = flat => (is.array(flat) ? flatten(...flat) : [flat])

/**
 * Concatenates a flat array with another deep value or array.
 *
 * @template T
 * @param {T[]} flat - The flat array to concatenate into.
 * @param {T | T[]} deep - A value or array to be flattened and concatenated.
 * @returns {T[]} The concatenated array.
 */
export const concat = (flat, deep) => flat.concat(shallow(deep))

/**
 * Recursively flattens one or more arrays into a single-level array.
 *
 * @template T
 * @param {...(T | T[])} arr - The arrays or values to flatten.
 * @returns {T[]} The flattened array.
 */
export const flatten = (...arr) =>
  /** @type {T[]} */ (arr.reduce(/** @type {any} */ (concat), /** @type {T[]} */ ([])))

/** @type {(arr: any[]) => any[]} */
export default flatten
