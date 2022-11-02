import { Config, RegisteredIterableClassEntry } from './model'

export const registeredClasses: unknown[] = []

export const registeredIterableClasses: RegisteredIterableClassEntry[] = [
  { classRef: Array, getKeys: (target: unknown) => Object.keys(target as Iterable<string>) },
  { classRef: Object, getKeys: (target: unknown) => Object.keys(target as Iterable<string>) }
]

let samePositionOfOwnProperties = false

export const setConfig = (config: Partial<Config>): void => {
  samePositionOfOwnProperties = config.samePositionOfOwnProperties || false
}

export const getConfig = (): Config => ({ samePositionOfOwnProperties })
