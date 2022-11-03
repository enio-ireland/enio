import { Config, RegisteredIterableClassEntry } from './model'

export const registeredClasses: unknown[] = []

export const registeredIterableClasses: RegisteredIterableClassEntry[] = [
  { classRef: Array, getKeys: (target: unknown) => Object.keys(target as Iterable<string>) },
  { classRef: Object, getKeys: (target: unknown) => Object.keys(target as Iterable<string>) }
]

let samePositionOfOwnProperties = false

let detectCircularReferences = false

export const setConfig = (config: Partial<Config>): void => {
  samePositionOfOwnProperties =
    typeof config.samePositionOfOwnProperties === 'boolean' ? config.samePositionOfOwnProperties : samePositionOfOwnProperties || false
  detectCircularReferences =
    typeof config.detectCircularReferences === 'boolean' ? config.detectCircularReferences : detectCircularReferences || false
}

export const getConfig = (): Config => ({ samePositionOfOwnProperties, detectCircularReferences })
