import { Callback, Options } from '../traverse/traverse.model'
import { traverse } from '../traverse/traverse'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getIterableOperators } from '../getIterableOperators/getIterableOperators'

/**
 * Edits any text by replacing any string or substring that matches a pattern or an exact value anywhere in the data structure of the target
 * and returns the location of the original text that were edited.
 * A depth option is available to narrow down the iteration scope.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 **/
export const replaceText = (target: unknown, pattern: string | RegExp, text: string, options?: Options): string[][] => {
  const patternIsString = typeof pattern === 'string'
  if (!patternIsString && !(pattern instanceof RegExp)) throw new Error('Expected pattern to be either a string of a regular expression.')
  if (typeof text !== 'string') throw new Error('Expected name to be a string.')
  const match = patternIsString ? (text: string) => text.includes(pattern) : (text: string) => pattern.test(text)
  const replace = (original: string) => original.replace(pattern, text)
  const callback: Callback = (key, value, path, state) => {
    const type = getType(value)
    if (!isIterableType(type)) return
    const { getKeys, read, write } = getIterableOperators(type)
    getKeys(value).forEach(nextKey => {
      const nextValue = read(value, nextKey)
      if (getType(nextValue) !== 'string' || !match(nextValue)) return
      write(value, replace(nextValue), nextKey)
      state.locations.push([...path, nextKey])
    })
  }
  return traverse(target, callback, { depth: [0, '*'], ...options } as Options, { locations: [] }).locations
}
