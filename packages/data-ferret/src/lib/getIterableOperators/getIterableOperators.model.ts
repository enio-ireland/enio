/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IterableOperators {
  instantiate: () => any
  getKeys: (target: any) => string[]
  read: (target: any, key: any) => any
  write: (instance: any, value: any, key?: any) => void
}
