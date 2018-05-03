const equal = require('./equal')
const different = require('./different')

module.exports = {
  equal,
  equals: equal,
  different: different,
  diff: different,
  loop: require('./loop'),
  flatten: require('./flatten'),
}
