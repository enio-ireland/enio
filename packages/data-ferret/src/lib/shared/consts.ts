import { UnknownClass, RegisteredIterableClassEntry, Config } from './model'
import { isMarker } from '../isMarker/isMarker'

export const registeredClasses: UnknownClass[] = []

export const registeredIterableClasses: RegisteredIterableClassEntry[] = [
  {
    classRef: Array,
    instantiate: () => [],
    getKeys: (target: unknown) => {
      const keys = Object.keys(target as Iterable<string>)
      if (getConfig().detectCircularReferences) return keys.filter(key => !isMarker(key))
      return keys
    },
    read: (target, key) => (target as Array<unknown>)[key as number],
    write: (target, value, key) => ((target as Array<unknown>)[key as number] = value),
    remove: (target, key) => (target as Array<unknown>).splice(key as number, 1)
  },
  {
    classRef: Object,
    instantiate: () => ({}),
    getKeys: (target: unknown) => {
      const keys = Object.keys(target as Iterable<string>)
      if (getConfig().detectCircularReferences) return keys.filter(key => !isMarker(key))
      return keys
    },
    read: (target, key) => (target as Record<string, unknown>)[key as string],
    write: (target, value, key) => ((target as Record<string, unknown>)[key as string] = value),
    remove: (target, key) => delete (target as Record<string, unknown>)[key as string]
  }
]

let samePositionOfOwnProperties = false

let detectCircularReferences = false

/**
 * Sets the global settings for data-ferret utils.
 */
export const setConfig = (config: Partial<Config>): void => {
  samePositionOfOwnProperties =
    typeof config.samePositionOfOwnProperties === 'boolean' ? config.samePositionOfOwnProperties : samePositionOfOwnProperties || false
  detectCircularReferences =
    typeof config.detectCircularReferences === 'boolean' ? config.detectCircularReferences : detectCircularReferences || false
}

/**
 * Returns the global settings for data-ferret utils.
 **/
export const getConfig = (): Config => ({ samePositionOfOwnProperties, detectCircularReferences })
