const shallow = flat => (Array.isArray(flat) ? flatten(...flat) : flat)

const concat = (flat, deep) => flat.concat(shallow(deep))

const flatten = (...arr) => arr.reduce(concat, [])

module.exports = flatten
