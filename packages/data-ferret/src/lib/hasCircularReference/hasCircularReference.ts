import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { getConfig, setConfig } from '../shared/consts'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'
import { UnknownIterable, UnknownIterableKey } from '../shared/model'

const hasCircularReference$ = (target: unknown, stack: ReferenceStack, root = false): boolean => {
  if (stack.exists(target)) return true
  const type = getType(target)
  if (!isIterableType(type)) return false
  stack.add(target)
  const keys = getKeysFromIterable(target, type)
  const result = keys.some(k => hasCircularReference$((target as UnknownIterable)[k as UnknownIterableKey], stack))
  if (root) stack.clear()
  return result
}

/**
 * Returns true for values that have circular references.
 */
export const hasCircularReference = (target: unknown): boolean => {
  const originalSupportStatus = getConfig().detectCircularReferences
  !originalSupportStatus && setConfig({ detectCircularReferences: true })
  const result = hasCircularReference$(target, referenceStack(), true)
  !originalSupportStatus && setConfig({ detectCircularReferences: false })
  return result
}
