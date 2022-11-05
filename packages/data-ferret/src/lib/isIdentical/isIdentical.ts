import { UnknownIterable, UnknownIterableKey } from '../shared/model'
import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { sameStructure } from '../sameStructure/sameStructure'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'
import { getConfig } from '../shared/consts'

/**
 * Returns true when both values are identical.
 * This algorithm does not check for circular references.
 */
const identical = (targetA: UnknownIterable, targetB: UnknownIterable): boolean => {
  if (targetA === targetB) return true
  const typeMatch = sameStructure(targetA, targetB)
  if (typeMatch === false) return typeMatch
  if (!isIterableType(typeMatch)) return targetA === targetB
  const keys = getKeysFromIterable(targetA, typeMatch)
  const keyCount = keys.length
  for (let i = 0; i < keyCount; i += 1) {
    const key = keys[i] as UnknownIterableKey
    if (!identical(targetA[key], targetB[key])) return false
  }
  return true
}

const allStackEmpty = (stacks: ReferenceStack[]) => stacks.every(s => !s.size)

const clearStacks = (stacks: ReferenceStack[]) => stacks.forEach(s => s.clear())

const noop = () => void 0

/**
 * Returns true when both values are identical.
 * This algorithm is able to compare values with circular references.
 */
const identical$ = (targetA: UnknownIterable, targetB: UnknownIterable, ...stacks: ReferenceStack[]): boolean => {
  const registerRefs = () => (stacks[0].add(targetA), stacks[1].add(targetB))
  const clear = allStackEmpty(stacks) ? (registerRefs(), () => clearStacks(stacks)) : noop
  if (targetA === targetB) {
    clear()
    return true
  }
  const typeMatch = sameStructure(targetA, targetB)
  if (typeMatch === false) {
    clear()
    return typeMatch
  }
  if (!isIterableType(typeMatch)) {
    clear()
    return targetA === targetB
  }
  const keys = getKeysFromIterable(targetA, typeMatch)
  const keyCount = keys.length
  for (let i = 0; i < keyCount; i += 1) {
    const key = keys[i] as UnknownIterableKey
    const nextA = targetA[key]
    const nextB = targetB[key]
    const aHasCircularRef = stacks[0].exists(nextA)
    const bHasCircularRef = stacks[1].exists(nextB)
    if (aHasCircularRef !== bHasCircularRef) {
      clear()
      return false
    }
    if (aHasCircularRef) {
      if (stacks[0].lastSeen(nextA) !== stacks[1].lastSeen(nextB)) {
        clear()
        return false
      }
      continue
    }
    registerRefs()
    if (!identical$(nextA, nextB, ...stacks)) {
      clear()
      return false
    }
  }
  clear()
  return true
}

/**
 * Returns true when both values are identical.
 * For primitive values, use strict equality comparison.
 * For non-primitive values, it checks equality by reviewing values' properties and values.
 */
export const isIdentical = (targetA: unknown, targetB: unknown): boolean => {
  const targets = [targetA, targetB] as [UnknownIterable, UnknownIterable]
  if (getConfig().detectCircularReferences) return identical$(...targets, referenceStack(), referenceStack())
  return identical(...targets)
}
