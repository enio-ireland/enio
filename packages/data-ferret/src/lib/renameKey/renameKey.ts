import { Callback, Options } from '../traverse/traverse.model'
import { traverse } from '../traverse/traverse'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getIterableOperators } from '../getIterableOperators/getIterableOperators'

/**
 * Renames any key names that match a pattern or an exact value anywhere in the data structure of the target
 * and returns the location of keys that were edited.
 * A depth option is available to narrow down the iteration scope.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 **/
export const renameKey = (target: unknown, pattern: string | RegExp, name: string, options?: Options): string[][] => {
  const patternIsString = typeof pattern === 'string'
  if (!patternIsString && !(pattern instanceof RegExp)) throw new Error('Expected pattern to be either a string of a regular expression.')
  if (typeof name !== 'string') throw new Error('Expected name to be a string.')
  const match = patternIsString ? (key: string) => key === pattern : (key: string) => pattern.test(key)
  const rename = patternIsString ? () => name : (key: string) => key.replace(pattern, name)
  const callback: Callback = (key, value, path, state) => {
    const type = getType(value)
    if (!isIterableType(type)) return
    const { getKeys, read, write, remove } = getIterableOperators(type)
    getKeys(value).forEach(nextKey => {
      if (!match(nextKey)) return
      const newKey = rename(nextKey)
      write(value, read(value, nextKey), newKey)
      remove(value, nextKey)
      state.locations.push([...path, newKey])
    })
  }
  return traverse(target, callback, { depth: [0, '*'], ...options } as Options, { locations: [] }).locations
}
