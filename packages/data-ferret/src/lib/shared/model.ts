/* eslint-disable @typescript-eslint/no-explicit-any */

export type Predicate = (x: unknown) => boolean

export type DataType = 'undefined' | 'object' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'null' | 'array'

export interface RegisteredIterableClassEntry {
  /** A reference to the class itself. */
  classRef: unknown

  /** Returns list of iterable keys. */
  getKeys: (target: any) => string[]
}
