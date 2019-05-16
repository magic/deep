### @magic/deep

Work with deeply nested objects and arrays.

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[npm-image]: https://img.shields.io/npm/v/@magic/deep.svg
[npm-url]: https://www.npmjs.com/package/@magic/deep
[travis-image]: https://api.travis-ci.com/magic/deep.svg?branch=master
[travis-url]: https://travis-ci.com/magic/deep
[appveyor-image]: https://img.shields.io/appveyor/ci/magic/deep/master.svg
[appveyor-url]: https://ci.appveyor.com/project/magic/deep/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic/deep/badge.svg
[coveralls-url]: https://coveralls.io/github/magic/deep
[greenkeeper-image]: https://badges.greenkeeper.io/magic/deep.svg
[greenkeeper-url]: https://badges.greenkeeper.io/magic/deep.svg
[snyk-image]: https://snyk.io/test/github/magic/deep/badge.svg
[snyk-url]: https://snyk.io/test/github/magic/deep

##### install
```bash
  npm i --save magic/deep
```

##### import
```javascript
  // single function
  const { equal, flatten, loop } = require('@magic/deep')

  // object with all functions
  const deep = require('@magic/deep')
  // deep.equal, deep.flatten, deep.loop

```

Currently implemented:

##### deep.equal
```javascript
  // test equality
  deep.equal(['shallow', ['deep']], ['shallow', ['deep']])
  // true

```
##### deep.flatten
```javascript
  // flatten a deeply nested array
  deep.flatten(['shallow', ['deep']])
  // ['shallow', 'deep']
```

##### deep.loop
```javascript
  // apply function add
  const add = e => e + 1

  // for each item
  const items = [1, 2, [3]]

  // in a deeply nested array
  deep.loop(add, items)
  // or
  deep.loop(items, add)
  // returns [2, 3, [4]]

```

### Changelog

#### v0.1.0
use ecmascript modules instead of commonjs.
