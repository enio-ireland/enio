import { UnknownClass } from '../shared/model'
import { registeredClasses } from '../shared/consts'

/**
 * Removes one or more registered classes.
 * Removes all registered classes when no references are provided.
 */
export const deregisterClassTypes = (...classRefs: UnknownClass<unknown>[]): void => {
  if (!classRefs.length) {
    while (registeredClasses.length) registeredClasses.shift()
    return
  }
  const indexes = classRefs
    .map(classRef => registeredClasses.indexOf(classRef))
    .filter(index => index >= 0)
    .sort()
  while (indexes.length) {
    registeredClasses.splice(indexes[indexes.length - 1], 1)
    indexes.pop()
  }
}
