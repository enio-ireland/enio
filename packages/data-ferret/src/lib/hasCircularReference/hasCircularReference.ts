import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'
import { UnknownIterable, UnknownIterableKey } from '../shared/model'

const hasCircularReference$ = (target: unknown, stack: ReferenceStack): boolean => {
  const start = stack.size === 0
  if (stack.exists(target)) return true
  const type = getType(target)
  if (!isIterableType(type)) return false
  stack.add(target)
  const keys = getKeysFromIterable(target, type)
  for (let i = 0; i < keys.length; i += 1) {
    if (hasCircularReference$((target as UnknownIterable)[keys[i] as UnknownIterableKey], stack)) {
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
