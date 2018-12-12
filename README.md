### @magic/deep

Work with deeply nested objects and arrays.

[![NPM version][npm-badge]][npm-url]
[![Linux Build Status][travis-badge]][travis-url]
[![Windows Build Status][appveyor-badge]][appveyor-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Greenkeeper badge](greenkeeper-badge)](greenkeeper-url)

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


[npm-badge]: https://img.shields.io/npm/v/@magic/deep.svg
[npm-url]: https://www.npmjs.com/package/@magic/deep
[travis-badge]: https://api.travis-ci.org/magic/deep.svg?branch=master
[travis-url]: https://travis-ci.org/magic/deep
[appveyor-badge]: https://img.shields.io/appveyor/ci/jaeh/deep/master.svg
[appveyor-url]: https://ci.appveyor.com/project/jaeh/deep/branch/master
[coveralls-badge]: https://coveralls.io/repos/github/magic/deep/badge.svg
[coveralls-url]: https://coveralls.io/github/magic/deep
[greenkeeper-url]: https://greenkeeper.io
[greenkeeper-badge]: https://badges.greenkeeper.io/magic/deep.svg

