import { sameStructure } from '../sameStructure/sameStructure'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'

/**
 * Returns true when both values are identical.
 * For primitive values, use strict equality comparison.
 * For non-primitive values, it checks equality by reviewing values' properties and values.
 */
export const identical = (targetA: unknown, targetB: unknown): boolean => {
  if (targetA === targetB) return true
  const structureMatch = sameStructure(targetA, targetB)
  if (structureMatch === false) return structureMatch
  if (!isIterableType(structureMatch)) return targetA === targetB
  const keys = getKeysFromIterable(targetA, structureMatch)
  const keyCount = keys.length
  for (let i = 0; i < keyCount; i += 1) {
    const key = keys[i]
    // @ts-expect-error TS2571 because accessing keys of unknown iterable.
    if (!identical(targetA[key], targetB[key])) return false
  }
  return true
}
