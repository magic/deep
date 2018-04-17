### @magic/deep

Work with deeply nested objects and arrays.

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
