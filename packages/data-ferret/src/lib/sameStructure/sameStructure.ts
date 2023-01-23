import { DataType } from '../shared/model'
import { sameType } from '../sameType/sameType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'
import { getConfig } from '../shared/consts'

/**
 * Returns the matching type when both values have the same type or structure (non-primitive type),
 * which compares each value's enumerable property names by default for arrays and objects, otherwise returns false.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 */
export const sameStructure = (targetA: unknown, targetB: unknown): DataType | false => {
  const typeMatch = sameType(targetA, targetB)
  if (typeMatch === false) return false
  if (isIterableType(typeMatch)) {
    const aKeys = getKeysFromIterable(targetA, typeMatch)
    const bKeys = getKeysFromIterable(targetB, typeMatch)
    const aKeyCount = aKeys.length
    const bKeyCount = bKeys.length
    if (aKeyCount !== bKeyCount) return false
    if (aKeyCount === 0) return typeMatch
    if (getConfig().samePositionOfOwnProperties) {
      for (let i = 0; i < aKeyCount; i += 1) {
        if (aKeys[i] !== bKeys[i]) return false
      }
    } else {
      for (let i = 0; i < aKeyCount; i += 1) {
        if (!bKeys.includes(aKeys[i])) return false
      }
    }
  }
  return typeMatch
}
