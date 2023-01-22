import { RegisteredIterableClassEntry, UnknownClass } from '../shared/model'
import { registeredIterableClasses } from '../shared/consts'
import { registerClassTypes } from '../registerClassTypes/registerClassTypes'
import { getConfig } from '../shared/consts'
import { isMarker } from '../isMarker/isMarker'

/**
 * Registers an iterable class which will be used on the rest of the API to treat instances
 * of said class as having their own unique data type that corresponds to their class.
 * It will overwrite an existing registered iterable class with new details if the class reference matches.
 * @param classRef A reference to a class definition.
 * @param getKeys Returns list of iterable keys.
 * @param write Operation that assigns a value in iterable instance.
 * @param instantiate Returns a new (empty) instance.
 */
export const registerIterableClass = <T = unknown>(
  classRef: UnknownClass<T>,
  getKeys: (target: T) => string[],
  read: (target: T, key: unknown) => unknown,
  write: (instance: T, value: unknown, key?: unknown) => void,
  instantiate = () => new classRef()
): void => {
  const existingEntryLocation = registeredIterableClasses.findIndex(entry => entry.classRef === classRef)
  const GetKeys = (target: T) =>
    getConfig().detectCircularReferences ? [...getKeys(target)].filter(key => !isMarker(key)) : getKeys(target)
  const entry = { classRef, getKeys: GetKeys, write, read, instantiate } as RegisteredIterableClassEntry
  if (existingEntryLocation >= 0) {
    registeredIterableClasses[existingEntryLocation] = entry
    return
  }
  registeredIterableClasses.unshift(entry)
  registerClassTypes(classRef)
}
