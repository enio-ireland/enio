import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { CircularReference } from '../CircularReference/CircularReference'
import { getConfig, setConfig } from '../shared/consts'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'
import { UnknownIterable, UnknownIterableKey } from '../shared/model'

const invalidmaxResults = 'Invalid maxResults argument.'

export const locateCircularReference$ = (
  target: unknown,
  maxResults: '*' | number,
  path: string[],
  stack: ReferenceStack,
  result: CircularReference[],
  root = false
): CircularReference[] => {
  if (result.length === maxResults) return result
  if (stack.exists(target)) {
    result.push(new CircularReference(path, path.slice(0, stack.lastSeen(target) as number)))
    return result
  }
  const type = getType(target)
  if (!isIterableType(type)) return result
  stack.add(target)
  const keys = getKeysFromIterable(target, type)
  keys.forEach(k => locateCircularReference$((target as UnknownIterable)[k as UnknownIterableKey], maxResults, [...path, k], stack, result))
  if (root) stack.clear()
  return result
}

/**
 * Returns a list of locations where circular references occur.
 */
export const locateCircularReference = (target: unknown, maxResults: '*' | number = 1): CircularReference[] => {
  const resultsType = typeof maxResults
  if (!['string', 'number'].includes(resultsType)) throw new Error(invalidmaxResults)
  if (resultsType === 'string' && maxResults !== '*') throw new Error(invalidmaxResults)
  if (resultsType === 'number' && (maxResults < 1 || [NaN, Infinity].includes(maxResults as number))) throw new Error(invalidmaxResults)
  const originalSupportStatus = getConfig().detectCircularReferences
  !originalSupportStatus && setConfig({ detectCircularReferences: true })
  const result = locateCircularReference$(target, maxResults, [], referenceStack(), [], true)
  !originalSupportStatus && setConfig({ detectCircularReferences: false })
  return result
}
