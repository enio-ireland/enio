import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'

const hasCircularReference$ = (target: unknown, stack: ReferenceStack): boolean => {
  const start = stack.size === 0
  if (stack.exists(target)) return true
  const type = getType(target)
  if (!isIterableType(type)) return false
  stack.add(target)
  const keys = getKeysFromIterable(target, type)
  for (let i = 0; i < keys.length; i += 1) {
    // @ts-expect-error TS2571 because target is set as unknown but should be regarded as iterable
    if (hasCircularReference$(target[keys[i]], stack)) {
      if (start) stack.clear()
      return true
    }
  }
  return false
}

/**
 * Returns true for values that have circular references.
 */
export const hasCircularReference = (target: unknown): boolean => hasCircularReference$(target, referenceStack())
