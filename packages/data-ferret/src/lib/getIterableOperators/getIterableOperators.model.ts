/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IterableOperators {
  instantiate: () => unknown
  getKeys: (target: any) => string[]
  read: (target: any, key: unknown) => unknown
  write: (instance: unknown, value: unknown, key?: unknown) => void
}
