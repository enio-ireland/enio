import { traverse } from '../traverse/traverse'
import { Callback, Options } from '../traverse/traverse.model'

/**
 * Returns the total depth of a value's data structure,
 * and returns a list of locations that are the most deeply nested.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 */
export const getDepth = (target: unknown): [number, string[][]] => {
  const trackDepth: Callback = (key, value, path, state) => {
    if (state.depth < path.length) {
      state.depth = path.length
      state.locations = [path]
      return
    }
    state.depth === path.length && state.locations.push(path)
  }
  const options: Options = { depth: [0, '*'] }
  const state = { depth: 0, locations: [] }
  const { depth, locations } = traverse(target, trackDepth, options, state)
  return [depth, locations]
}
