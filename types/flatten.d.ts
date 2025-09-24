export function shallow<T>(flat: T | T[]): T[]
export function concat<T>(flat: T[], deep: T | T[]): T[]
export function flatten<T>(...arr: (T | T[])[]): T[]
export default flatten
