import { UnknownClass } from '../shared/model'
import { registeredClasses } from '../shared/consts'

/**
 * Registers one or more classes which will be used on the rest of the API to treat instances to treat instances
 * of said class or classes as having their own unique data type that corresponds to their class.
 */
export const registerClassTypes = (...classRefs: UnknownClass[]): void => {
  classRefs.forEach(classRef => !registeredClasses.includes(classRef) && registeredClasses.unshift(classRef))
}
