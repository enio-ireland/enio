import { UnknownClass, RegisteredIterableClassEntry, Config } from './model'

export const registeredClasses: UnknownClass[] = []

export const registeredIterableClasses: RegisteredIterableClassEntry[] = [
  { classRef: Array, instantiate: () => [], getKeys: (target: unknown) => Object.keys(target as Iterable<string>), write: (target, value, key) => (target as Array<unknown>)[key as number] = value },
  { classRef: Object, instantiate: () => ({}), getKeys: (target: unknown) => Object.keys(target as Iterable<string>), write: (target, value, key) => (target as Record<string, unknown>)[key as string] = value   }
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
