export const equal: {
  (a: unknown, b: unknown): boolean
  (a: unknown): (c: unknown) => boolean
}
export const equals: {
  (a: unknown, b: unknown): boolean
  (a: unknown): (c: unknown) => boolean
}
export const eq: {
  (a: unknown, b: unknown): boolean
  (a: unknown): (c: unknown) => boolean
}
export const different: {
  (a: unknown, b: unknown): boolean
  (a: unknown): (c: unknown) => boolean
}
export const diff: {
  (a: unknown, b: unknown): boolean
  (a: unknown): (c: unknown) => boolean
}
export const flatten: <T>(...arr: (T | T[])[]) => T[]
export const loop: <T, R>(fn: ((item: T) => R) | T, ...items: any[]) => any
export const merge: <T, U>(o1: T, o2: U) => any
declare namespace _default {
  export { equal }
  export { equals }
  export { eq }
  export { different }
  export { diff }
  export { flatten }
  export { loop }
  export { merge }
}
export default _default
