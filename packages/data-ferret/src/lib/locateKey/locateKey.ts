import { Callback, Options } from '../traverse/traverse.model'
import { traverse } from '../traverse/traverse'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getIterableOperators } from '../getIterableOperators/getIterableOperators'

/**
 * Returns a list of locations where the key name matches a pattern or an exact value anywhere in the data structure of the value.
 * A depth option is available to narrow down the iteration scope.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 **/
export const locateKey = (target: unknown, pattern: string | RegExp, options: Options): string[][] => {
  const patternIsString = typeof pattern === 'string'
  if (!patternIsString && !(pattern instanceof RegExp)) throw new Error('Expected pattern to be either a string of a regular expression.')
  const match = patternIsString ? (key: string) => key === pattern : (key: string) => pattern.test(key)
  const callback: Callback = (key, value, path, state) => {
    const type = getType(value)
    if (!isIterableType(type)) return
    const { getKeys } = getIterableOperators(type)
    getKeys(value).forEach(nextKey => match(nextKey) && state.locations.push([...path, nextKey]))
  }
  return traverse(target, callback, options, { locations: [] }).locations
}
