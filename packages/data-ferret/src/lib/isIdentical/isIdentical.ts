import { UnknownIterable, UnknownIterableKey } from '../shared/model'
import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { sameStructure } from '../sameStructure/sameStructure'
import { isIterableType } from '../isIterableType/isIterableType'
import { getIterableOperators } from '../getIterableOperators/getIterableOperators'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'
import { getConfig } from '../shared/consts'

/**
 * Returns true when both values are identical.
 * This algorithm does not check for circular references.
 */
const isIdenticalRecursive = (targetA: UnknownIterable, targetB: UnknownIterable): boolean => {
  if (targetA === targetB) return true
  const typeMatch = sameStructure(targetA, targetB)
  if (typeMatch === false) return typeMatch
  if (typeMatch === 'function') return targetA.toString() === targetB.toString()
  if (!isIterableType(typeMatch)) return targetA === targetB
  const { getKeys, read } = getIterableOperators(typeMatch)
  const keys = getKeys(targetA)
  const keyCount = keys.length
  for (let i = 0; i < keyCount; i += 1) {
    const key = keys[i]
    if (!isIdenticalRecursive(read(targetA, key), read(targetB, key))) return false
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
const isIdenticalForCircularReferencesRecursive = (
  targetA: UnknownIterable,
  targetB: UnknownIterable,
  ...stacks: ReferenceStack[]
): boolean => {
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
  if (typeMatch === 'function') {
    clear()
    return targetA.toString() === targetB.toString()
  }
  if (!isIterableType(typeMatch)) {
    clear()
    return targetA === targetB
  }
  const { getKeys, read } = getIterableOperators(typeMatch)
  const keys = getKeys(targetA)
  const keyCount = keys.length
  for (let i = 0; i < keyCount; i += 1) {
    const key = keys[i] as UnknownIterableKey
    const nextA = read(targetA, key)
    const nextB = read(targetB, key)
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
    if (!isIdenticalForCircularReferencesRecursive(nextA, nextB, ...stacks)) {
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
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 */
export const isIdentical = (targetA: unknown, targetB: unknown): boolean => {
  const targets = [targetA, targetB] as [UnknownIterable, UnknownIterable]
  if (getConfig().detectCircularReferences) {
    return isIdenticalForCircularReferencesRecursive(...targets, referenceStack(), referenceStack())
  }
  return isIdenticalRecursive(...targets)
}
