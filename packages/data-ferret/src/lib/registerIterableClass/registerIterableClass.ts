import { RegisteredIterableClassEntry } from '../shared/model'
import { registeredIterableClasses, registeredClasses } from '../shared/consts'
import { registerClassTypes } from '../registerClassTypes/registerClassTypes'

/**
 * Registers one or more classes which will set up the rest of the data-ferret'd API to treat instances
 * said class or classes as having their own unique data type that corresponds to their class.
 */
export const registerIterableClass = (...classes: RegisteredIterableClassEntry[]): void => {
  const list = ([] as RegisteredIterableClassEntry[]).concat(classes)
  while (registeredIterableClasses.length > 2) {
    // while > 2 to leave default object and array entries unchanged
    registeredIterableClasses.shift()
  }
  list.reverse().forEach(entry => registeredIterableClasses.unshift(entry))
  registerClassTypes(...registeredClasses, ...list.map(({ classRef }) => classRef))
}
