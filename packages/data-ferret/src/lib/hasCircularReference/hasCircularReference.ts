import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { getConfig, setConfig } from '../shared/consts'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getIterableOperators } from '../getIterableOperators/getIterableOperators'

const hasCircularReferenceRecursive = (target: unknown, stack: ReferenceStack, root = false): boolean => {
  if (stack.exists(target)) return true
  const type = getType(target)
  if (!isIterableType(type)) return false
  stack.add(target)
  const { getKeys, read } = getIterableOperators(type)
  const keys = getKeys(target)
  const result = keys.some(key => hasCircularReferenceRecursive(read(target, key), stack))
  if (root) stack.clear()
  return result
}

/**
 * Returns true for values that have circular references.
 */
export const hasCircularReference = (target: unknown): boolean => {
  const originalSupportStatus = getConfig().detectCircularReferences
  !originalSupportStatus && setConfig({ detectCircularReferences: true })
  const result = hasCircularReferenceRecursive(target, referenceStack(), true)
  !originalSupportStatus && setConfig({ detectCircularReferences: false })
  return result
}
