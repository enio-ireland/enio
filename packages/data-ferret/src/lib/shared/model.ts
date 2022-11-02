/* eslint-disable @typescript-eslint/no-explicit-any */

export type Predicate = (x: unknown) => boolean

export type DataType = 'undefined' | 'object' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'null' | 'array'

export interface RegisteredIterableClassEntry {
  /** A reference to the class itself. */
  classRef: unknown

  /** Returns list of iterable keys. */
  getKeys: (target: any) => string[]
}

export interface Config {
  /**
   * A flag that indicates the API that two values can match if their properties are in the same order when set to true.
   **/
  samePositionOfOwnProperties: boolean
}
