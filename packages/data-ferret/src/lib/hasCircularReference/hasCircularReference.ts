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
  const result = keys.some(k => hasCircularReference$((target as UnknownIterable)[k as UnknownIterableKey], stack))
  if (result && start) stack.clear()
  return result
}

/**
 * Returns true for values that have circular references.
 */
export const hasCircularReference = (target: unknown): boolean => hasCircularReference$(target, referenceStack())
