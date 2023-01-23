import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { CircularReference } from '../CircularReference/CircularReference'
import { getConfig, setConfig } from '../shared/consts'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getIterableOperators } from '../getIterableOperators/getIterableOperators'

const invalidmaxResults = 'Invalid maxResults argument.'

export const locateCircularReferenceRecursive = (
  target: unknown,
  maxResults: '*' | number,
  path: string[],
  stack: ReferenceStack,
  result: CircularReference[],
  root = false
): CircularReference[] => {
  if (result.length === maxResults) return result
  if (stack.exists(target)) {
    result.push(new CircularReference(path as [string, ...string[]], path.slice(0, stack.lastSeen(target) as number)))
    return result
  }
  const type = getType(target)
  if (!isIterableType(type)) return result
  stack.add(target)
  const { getKeys, read } = getIterableOperators(type)
  const keys = getKeys(target)
  keys.forEach(key => locateCircularReferenceRecursive(read(target, key), maxResults, [...path, key], stack, result))
  if (root) stack.clear()
  return result
}

/**
 * Returns a list of locations where circular references occur.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 */
export const locateCircularReference = (target: unknown, maxResults: '*' | number = 1): CircularReference[] => {
  const resultsType = typeof maxResults
  if (!['string', 'number'].includes(resultsType)) throw new Error(invalidmaxResults)
  if (resultsType === 'string' && maxResults !== '*') throw new Error(invalidmaxResults)
  if (resultsType === 'number' && (maxResults < 1 || [NaN, Infinity].includes(maxResults as number))) throw new Error(invalidmaxResults)
  const originalSupportStatus = getConfig().detectCircularReferences
  !originalSupportStatus && setConfig({ detectCircularReferences: true })
  const result = locateCircularReferenceRecursive(target, maxResults, [], referenceStack(), [], true)
  !originalSupportStatus && setConfig({ detectCircularReferences: false })
  return result
}
