import { DataType } from '../models'
import { IterableOperators } from '../getIterableOperators/getIterableOperators.model'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getIterableOperators } from '../getIterableOperators/getIterableOperators'
import { DefaultValueOptions } from './getValue.model'

/**
 * Drills down the data structure of the target value for each key in the path.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 */
export const getValue = <T = unknown>(target: unknown, path: [string, ...string[]], defaultValue?: DefaultValueOptions<T>): T => {
  if (!path || !Array.isArray(path)) throw Error('Expected path to be an array.')
  const hasOnMissingKeyDefault = !!(defaultValue && 'onMissingKey' in defaultValue)
  const hasOnErrorDefault = !!(defaultValue && 'onError' in defaultValue)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let scope: any
  let scopeType: DataType
  let scopeIterable: boolean
  let scopeOperators: IterableOperators
  try {
    scope = target
    for (let index = 0; index < path.length; index += 1) {
      const key = path[index]
      if (!key || typeof key !== 'string') throw Error(`Expected path.${index} to be a non-empty string.`)
      scopeType = getType(scope)
      scopeIterable = isIterableType(scopeType)
      /* istanbul ignore next */
      if (!scopeIterable && hasOnMissingKeyDefault) {
        scope = defaultValue.onMissingKey
        break
      }
      scopeOperators = getIterableOperators(scopeType)
      if (scopeIterable && !scopeOperators.getKeys(scope).includes(key) && hasOnMissingKeyDefault) {
        scope = defaultValue.onMissingKey
        break
      }
      scope = scopeOperators.read(scope, key)
    }
  } catch (error) {
    if (hasOnErrorDefault) scope = defaultValue.onError
    else {
      throw error
    }
  }
  return scope
}
