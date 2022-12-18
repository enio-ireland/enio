<br>

<p align="center">
  <img width="197" src="https://github.com/enio-ireland/enio/blob/develop/images/data-ferret.png?raw=true">
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/@enio.ai/data-ferret?style=flat-square">
  <img alt="NPM" src="https://img.shields.io/npm/l/@enio.ai/data-ferret?style=flat-square">
  <img alt="npm" src="https://img.shields.io/npm/dm/@enio.ai/data-ferret?style=flat-square">
  <img alt="GitHub contributors (via allcontributors.org)" src="https://img.shields.io/github/all-contributors/enio-ireland/enio/develop?color=%23&style=flat-square">
  <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/enio-ireland?style=flat-square">
</p>

<p align="center">
  <a href="https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret">data-ferret</a> is a tiny yet powerful util library to scan or transform deeply nested and complex object-like data with ease. It is created, maintained, and released as open source under MIT license by a group of passionate individuals in <a href="https://github.com/enio-ireland/enio">Enio</a>.
</p>

<br>
<br>

## Key Features

1. **Ideal for managing**, indexing, searching, and transforming **complex data** whose interface or shape cannot be guaranteed, in other words, _messy data_.
2. **Designed to be extensible** to support custom class instances or iterables, beyond the native JavaScript data types.
3. Provides **first-class support for** handling objects with **circular references**.
4. **Zero dependencies.**
5. **Bug-free.** Features have been thoroughly tested, and published versions have a 100% code coverage guarantee.

<br>

## Status

This project is a rewrite of [mitsuketa](https://www.npmjs.com/package/mitsuketa) from the ground up, and it is still in the process of being migrated. So expect more features soon! ETA: 1 week.

<br>

## Installation

Using npm:

```
$ npm i -g npm
$ npm i --save @enio.ai/data-ferret
```

<br>

## How to Use

You can import utils from [data-ferret]() just as you would with other npm packages.

```javascript
import { isIdential, hasCircularReference } from '@enio.ai/data-ferret' // access API via import
```

<br>

## API

### Data Comparison

[data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) provides a suite of utils for data comparison and evaluation.

| Util                | Description                                                                                                                                                                                                                                                                                                                    |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getType()]()       | Returns the data type of the target. Uses native typeof, however, makes a separate distinction for 'null' and 'array' values. Additionally, when classes are registered as types, it checks if objects are instances of a known class.                                                                                         |
| [sameType()]()      | Returns the matching data type for both values, otherwise, returns false.                                                                                                                                                                                                                                                      |
| [sameStructure()]() | Returns the matching type when both values have the same type or structure (non-primitive type), which compares each value's enumerable property names by default for arrays and objects, otherwise returns false. It supports other iterable data types, provided these have been made known using `registerIterableClass()`. |
| [isIterable()]()    | Returns true when a value is iterable. By default, arrays and objects are considered iterable. Additional iterable types can be assigned by using `registerIterableClass()`.                                                                                                                                                   |
| [isIdentical()]()   | Returns true when both values are identical. For primitive values, use strict equality comparison. For non-primitive values, it checks equality by reviewing values' properties and values.                                                                                                                                    |
| [containsKeys()]()  | A predicate that returns true when the value contains the keys that are expected. It supports other iterable data types, provided these have been made known using `registerIterableClass()`.                                                                                                                                  |

### Circular Reference Data Support

[data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) comes equipped with a configurable API that allows it to work with circular referenced data with ease.

_Note!: Circular reference detection is not supported for immutable data. E.g. `Object.freeze(data)`_.

| Util                       | Description                                                                                                                                                                                           |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hasCircularReference()]() | Returns true for values that have circular references.                                                                                                                                                |
| [isIdentical()]()          | Same util as described in the previous section. One important thing to note is that it can compare values with circular references. Just need to set the `detectCircularReferences` configuration ON. |

### Beyond Native Constructs Support

[data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) is designed to be extensible. It provides some utils that let it understand constructs that are not native JavaScript data types.

For example, passing the class definition and key selector function `registerIterableClass()` allows [data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) to iterate for members of that class and also treats it like a separate data type instead of a plain object.

| Util                          | Description                                                                                                                                                                                                  |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [registerClassTypes()]()      | Registers one or more classes which will be used on the rest of the API to treat instances to treat instances of said class or classes as having their own unique data type that corresponds to their class. |
| [registerIterableClass()]()   | Registers an iterable class which will be used on the rest of the API to treat instances of said class as having their own unique data type that corresponds to their class.                                 |
| [deregisterClassTypes()]()    | Removes one or more registered classes. Removes all registered classes when no references are provided.                                                                                                      |
| [deregisterIterableClass()]() | Removes one or more registered iterable classes. Removes all registered iterable classes when no references are provided.                                                                                    |

### Configurable Behavior

Some read/write utils to set global util behavior.

| Util            | Description                                        |
| :-------------- | :------------------------------------------------- |
| [setConfig()]() | Sets the global settings for data-ferret utils.    |
| [getConfig()]() | Returns the global settings for data-ferret utils. |

#### Options

| Key                             | Description                                                                                                                                                                                   |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [samePositionOfOwnProperties]() | A flag that indicates the API that two values can match if their properties are in the same order when set to true.                                                                           |
| [detectCircularReferences]()    | A flag that indicates the API that circular references may exist and should keep a tally of reference stack. Turning this flag ON comes at a performance cost, so enable only when necessary. |

<br>

<br>

## [Contributors](https://github.com/enio-ireland/enio/blob/develop/CONTRIBUTORS.md)

<br>

## Sponsors

<p style="text-align: justify">
  Maintenance of this project is made possible by all the contributors and sponsors. If you'd like to sponsor this project and have your avatar or company logo appear below <a href="https://github.com/sponsors/enio-ireland">click here</a>. 💖
</p>

(This list will be automatically generated in the future.)
