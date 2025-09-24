import is from '@magic/types'

export const shallow = flat => (is.array(flat) ? flatten(...flat) : flat)

export const concat = (flat, deep) => flat.concat(shallow(deep))

export const flatten = (...arr) => arr.reduce(concat, [])

export default flatten
