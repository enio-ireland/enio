/* eslint-disable @typescript-eslint/no-explicit-any */

export type Predicate = (x: unknown) => boolean

export type DataType = 'undefined' | 'object' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'null' | 'array'

export type UnknownIterable = Iterable<unknown>

export type UnknownIterableKey = keyof UnknownIterable & string

export type UnknownClass = {
  new (...args: any[]): unknown
}

export interface RegisteredIterableClassEntry {
  /** A reference to a class definition. */
  classRef: UnknownClass

  /** Returns list of iterable keys. */
  getKeys: (target: any) => string[]
}

export interface Config {
  /**
   * A flag that indicates the API that two values can match if their properties are in the same order when set to true.
   **/
  samePositionOfOwnProperties: boolean

  /**
   * A flag that indicates the API that circular references may exist and should keep a tally of reference stack.
   * Turning this flag ON comes at a performance cost, so enable only when necessary.
   */
  detectCircularReferences: boolean
}
