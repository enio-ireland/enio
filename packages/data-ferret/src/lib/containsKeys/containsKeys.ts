import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'

/**
 * A predicate that returns true when value contains the keys that are expected.
 * It supports other iterable data types, provided these have been made known using registerIterableClass().
 */
export const containsKeys = (target: unknown, keys: string[]): boolean => {
  if (!keys.length) return false
  const dataType = getType(target)
  if (!isIterableType(dataType)) return false
  const targetKeys = getKeysFromIterable(target, dataType)
  return !keys.some(k => !targetKeys.includes(k))
}
