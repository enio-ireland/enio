import { UnknownClass } from '../shared/model'
import { registeredIterableClasses } from '../shared/consts'
import { deregisterClassTypes } from '../deregisterClassTypes/deregisterClassTypes'

/**
 * Removes one or more registered iterable classes.
 * Removes all registered iterable classes when no references are provided.
 */
export const deregisterIterableClass = (...classRefs: UnknownClass<unknown>[]): void => {
  if (!classRefs.length) {
    while (registeredIterableClasses.length > 2 /* 2 built-in Object and Array support */) {
      const classRef = registeredIterableClasses[0].classRef as ArrayConstructor | ObjectConstructor
      ![Array, Object].includes(classRef) && registeredIterableClasses.shift()
    }
  } else {
    const indexes = classRefs
      .map(classRef => registeredIterableClasses.findIndex(entry => entry.classRef === classRef))
      .filter(index => index >= 0)
      .sort()
    while (indexes.length) {
      registeredIterableClasses.splice(indexes[indexes.length - 1], 1)
      indexes.pop()
    }
  }
  deregisterClassTypes(...classRefs)
}
