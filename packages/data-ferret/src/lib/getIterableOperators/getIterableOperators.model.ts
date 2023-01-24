/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IterableOperators {
  getKeys: (target: any) => string[]
  read: (target: any, key: any) => any
  write: (instance: any, value: any, key?: any) => void
  remove: (target: any, key: any) => void
  instantiate: () => any
}
