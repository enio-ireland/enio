import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'

/**
 * Returns true when a value is iterable.
 * By default, arrays and objects are considered iterable.
 * Additional iterable types can be assigned by using registerIterableClass().
 */
export const isIterable = (target: unknown): boolean => isIterableType(getType(target))
