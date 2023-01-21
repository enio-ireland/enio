/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReferenceStack } from '../referenceStack/referenceStack.model'

export interface Options {
  depth: [number, number | '*'] | [number] | []
}

export interface Config {
  depth: [number, number | '*']
  exitEarly: boolean
}

export type Condition = (config: Config, key: string, value: unknown, path: string[], parent: unknown) => boolean

export type Callback = (key: string, value: unknown, path: string[], state: any, parent: unknown) => void

export type TraversalArgs<T = unknown, S extends Record<string, unknown> = Record<string, unknown>> = [
  Condition,
  Callback,
  Config,
  string,
  string[],
  T,
  unknown,
  S
]

export type TraversalNonCircular<S extends Record<string, unknown> = Record<string, unknown>> = (
  condition: Condition,
  callback: Callback,
  config: Config,
  key: string,
  path: string[],
  value: unknown,
  parent: unknown,
  state: S
) => S

export type TraversalCircular = (
  condition: Condition,
  callback: Callback,
  config: Config,
  key: string,
  path: string[],
  value: unknown,
  parent: unknown,
  state: any,
  stack: ReferenceStack,
  root?: boolean
) => any

export type Traversal<T = unknown> = (target: T, condition: Condition, callback: Callback, options: Options, state: any) => any

export type TraversalCreator<T = unknown> = (condition: Condition) => Traverse<T>

export type Traverse<T = unknown> = (target: T, callback: Callback, options?: Options, state?: any) => any
