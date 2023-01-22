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

## News

- [2023-01-21](https://github.com/enio-ireland/enio/blob/develop/packages/data-ferret/CHANGELOG.md#100-2023-01-21) - A new `traverse()` function makes it to the API. This method lets you visit each data point on a data structure to perform any read or write operations you want.
- [2023-01-20](https://github.com/enio-ireland/enio/blob/develop/packages/data-ferret/CHANGELOG.md#100-2023-01-20) - A new `locateCircularReference()` function allows you to locate all occurrences of circular references in a data structure.
- [2022-12-27](https://github.com/enio-ireland/enio/blob/develop/packages/data-ferret/CHANGELOG.md#100-2022-12-27) - A new `selectiveCopy()` function is introduced that allows you to clone data structures easily. It can detect and replicate circular references, and provides options to selectively copy data.

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
import { isIdential, hasCircularReference } from '@enio.ai/data-ferret'
```

<br>

## API

### Data Comparison

[data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) provides a suite of utils for data comparison and evaluation.

| Util                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getType()](./src/lib/getType/)             | Returns the data type of the target. Uses native typeof, however, makes a separate distinction for 'null' and 'array' values. Additionally, when classes are registered as types, it checks if objects are instances of a known class. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/getType/getType.spec.ts)                                                                                                     |
| [sameType()](./src/lib/sameType/)           | Returns the matching data type for both values, otherwise, returns false. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/sameType/sameType.spec.ts)                                                                                                                                                                                                                                                                |
| [sameStructure()](./src/lib/sameStructure/) | Returns the matching type when both values have the same type or structure (non-primitive type), which compares each value's enumerable property names by default for arrays and objects, otherwise returns false. It supports other iterable data types, provided these have been made known using `registerIterableClass()`. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/sameStructure/sameStructure.spec.ts) |
| [isIterable()](./src/lib/isIterable/)       | Returns true when a value is iterable. By default, arrays and objects are considered iterable. Additional iterable types can be assigned by using `registerIterableClass()`. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/isIterable/isIterable.spec.ts)                                                                                                                                                         |
| [isIdentical()](./src/lib/isIdentical/)     | Returns true when both values are identical. For primitive values, use strict equality comparison. For non-primitive values, it checks equality by reviewing values' properties and values. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/isIdentical/isIdentical.spec.ts)                                                                                                                                        |
| [containsKeys()](./src/lib/containsKeys/)   | A predicate that returns true when the value contains the keys that are expected. It supports other iterable data types, provided these have been made known using `registerIterableClass()`. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/containsKeys/containsKeys.spec.ts)                                                                                                                                    |

### Data Manipulation

[data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) provides a suite of convenient util functions that allows it to perform quick data transformations with ease.

| Util                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [selectiveCopy()](./src/lib/selectiveCopy/) | Creates a clone of the target value. Options can be provided to selectively copy values, to partially clone. Due to JavaScript language limitations context of bound functions is not known, thus functions cannot be reliably cloned. This algorithm instead copies function references by default instead. For the same reason getters and setters are not replicate, only their return values. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/selectiveCopy/selectiveCopy.spec.ts) |
| [traverse()](./src/lib/traverse/)           | It invokes a callback function for every data point in the data structure of the target value to let you do read and write operations. A depth option is available to narrow down the iteration scope. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/traverse/traverse.spec.ts)                                                                                                                                                                                                      |
| [createTraversal()](./src/lib/traverse/)    | A higher-order that takes a single predicate function to generate an algorithm that traverses data points on a data structure. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/traverse/traverse.spec.ts)                                                                                                                                                                                                                                                                              |

### Circular Reference Data Support

[data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) comes equipped with a configurable API that allows it to work with circular referenced data with ease.

_Note!: Circular reference detection is not supported for immutable data. E.g. `Object.freeze(data)`_.

| Util                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [hasCircularReference()](./src/lib/hasCircularReference/)       | Returns true for values that have circular references. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/hasCircularReference/hasCircularReference.spec.ts)                                                                                                                                                                                                       |
| [locateCircularReference()](./src/lib/locateCircularReference/) | Returns a list of locations where circular references occur. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/locateCircularReference/locateCircularReference.spec.ts)                                                                                                                                                                                           |
| [isIdentical()](./src/lib/isIdentical/)                         | Same util as described in the previous section. Additionally, it can compare values with circular references. Just need to set the `detectCircularReferences` configuration ON. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/isIdentical/isIdentical.spec.ts)                                                                                                |
| [selectiveCopy()](./src/lib/selectiveCopy/)                     | Same util as described in the previous section. Additionally, it can clone values with circular references. By default, it will skip over circular references. When `detectCircularReferences` configuration ON, the algorithm will also recreate the circular references. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/selectiveCopy/selectiveCopy.spec.ts) |
| [traverse()](./src/lib/traverse/)                               | Same util as described in the previous section. Additionally, it can skip over circular references to avoid infinite recursion. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/traverse/traverse.spec.ts)                                                                                                                                                      |

### Beyond Native Constructs Support

[data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) is designed to be extensible. It provides some utils that let it understand constructs that are not native JavaScript data types.

For example, passing the class definition and key selector function `registerIterableClass()` allows [data-ferret](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret) to iterate for members of that class and also treats it like a separate data type instead of a plain object.

| Util                                                            | Description                                                                                                                                                                                                                                                                                                                                               |
| :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [registerClassTypes()](./src/lib/registerClassTypes/)           | Registers one or more classes which will be used on the rest of the API to treat instances to treat instances of said class or classes as having their own unique data type that corresponds to their class. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerClassTypes/registerClassTypes.spec.ts) |
| [registerIterableClass()](./src/lib/registerIterableClass/)     | Registers an iterable class which will be used on the rest of the API to treat instances of said class as having their own unique data type that corresponds to their class. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass/registerIterableClass.spec.ts)                           |
| [deregisterClassTypes()](./src/lib/deregisterClassTypes/)       | Removes one or more registered classes. Removes all registered classes when no references are provided. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/deregisterClassTypes/deregisterClassTypes.spec.ts)                                                                                                  |
| [deregisterIterableClass()](./src/lib/deregisterIterableClass/) | Removes one or more registered iterable classes. Removes all registered iterable classes when no references are provided. [specs :book:](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/deregisterIterableClass/deregisterIterableClass.spec.ts)                                                                          |

### Configurable Behavior

Some read/write utils to set global util behavior.

| Util                             | Description                                        |
| :------------------------------- | :------------------------------------------------- |
| [setConfig()](./src/lib/shared/) | Sets the global settings for data-ferret utils.    |
| [getConfig()](./src/lib/shared/) | Returns the global settings for data-ferret utils. |

#### Options

| Key                                              | Description                                                                                                                                                                                   |
| :----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [samePositionOfOwnProperties](./src/lib/shared/) | A flag that indicates the API that two values can match if their properties are in the same order when set to true.                                                                           |
| [detectCircularReferences](./src/lib/shared/)    | A flag that indicates the API that circular references may exist and should keep a tally of reference stack. Turning this flag ON comes at a performance cost, so enable only when necessary. |

<br>

<br>

## [Contributors :link:](https://github.com/enio-ireland/enio/blob/develop/CONTRIBUTORS.md)

<br>

## Sponsors

<p style="text-align: justify">
  Maintenance of this project is made possible by all the contributors and sponsors. If you'd like to sponsor this project and have your avatar or company logo appear below <a href="https://github.com/sponsors/enio-ireland">click here</a>. 💖
</p>

(This list will be automatically generated in the future.)
