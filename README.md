# Element.prototype.queryAll

> Returns elements that matches relativeSelectors.

The [Elements.prototype.queryAll] polyfill adds support for `query`, `queryAll`, with the later returning an `Elements` collection, which is a subclass of Array.

```js
return target.queryAll('.some-elements').query('.first-matching')
```

- Write relative selectors.
  ```js
  return target.query("> .matching-child")
  ```
- Use Array methods
  ```js
  return target.queryAll('> .matching-children').forEach
  ```
- Run queryAll on queryAll
  ```js
  return target.queryAll('.some-elements').query('.first-matching')
  ```
