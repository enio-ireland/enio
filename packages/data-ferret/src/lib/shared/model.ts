/* eslint-disable @typescript-eslint/no-explicit-any */

export type Predicate = (x: unknown) => boolean

export type DataType = 'undefined' | 'object' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'null' | 'array'

export type UnknownIterable = Iterable<unknown>

export type UnknownIterableKey = keyof UnknownIterable & string

export type UnknownClass<T = unknown> = {
  new (...args: any[]): T
}

export interface RegisteredIterableClassEntry<T = unknown> {
  /** A reference to a class definition. */
  classRef: UnknownClass<T>

  /** Returns a new (empty) instance. */
  instantiate: () => T

  /** Returns list of iterable keys. */
  getKeys: (target: any) => string[]

  /** Returns a value corresponding to a key of class instance. */
  read: (target: any, key: unknown) => unknown

  /** Sets a new value with specific key optionally on class instance. */
  write: (instance: T, value: unknown, key?: unknown) => void

  /** Removes a key from from the class instance. */
  remove: (instance: T, key: unknown) => void
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
