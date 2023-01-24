import { Callback, Options } from '../traverse/traverse.model'
import { traverse } from '../traverse/traverse'
import { getType } from '../getType/getType'

/**
 * Returns a list of locations where a text value matches a pattern or an exact value anywhere in the data structure of the target.
 * A depth option is available to narrow down the iteration scope.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 **/
export const locateText = (target: unknown, pattern: string | RegExp, options?: Options): string[][] => {
  const patternIsString = typeof pattern === 'string'
  if (!patternIsString && !(pattern instanceof RegExp)) throw new Error('Expected pattern to be either a string of a regular expression.')
  const match = patternIsString ? (text: string) => text === pattern : (key: string) => pattern.test(key)
  const callback: Callback = (key, value, path, state) =>
    getType(value) === 'string' && match(value as string) && state.locations.push(path)
  return traverse(target, callback, { depth: [0, '*'], ...options } as Options, { locations: [] }).locations
}
