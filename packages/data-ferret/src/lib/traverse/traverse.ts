import { referenceStack } from '../referenceStack/referenceStack'
import {
  TraversalCircular,
  TraversalNonCircular,
  Traversal,
  TraversalCreator,
  TraversalArgs,
  Config,
  Condition,
  Callback,
  Options
} from './traverse.model'
import { getConfig } from '../shared/consts'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'

const errorMessage = (thing: string, type: string) => `Expected ${thing} to be ${type}.`

const nextIterationDetails = (path: string[], key: string, value: unknown) => ({
  nextPath: [...path, key],
  nextValue: (value as Record<string, unknown>)[key]
})

const circularDependencyTraversal: TraversalCircular = (
  condition,
  callback,
  config,
  key,
  path,
  value,
  parent,
  state,
  stack,
  root = false
) => {
  if (stack.exists(value)) return state
  const ok = condition(config, key, value, path, parent)
  /* istanbul ignore next */
  if (config.exitEarly) return state
  if (ok) callback(key, value, path, state, parent)
  stack.add(value)
  const type = getType(value)
  if (!isIterableType(type)) return state
  const keys = getKeysFromIterable(value, type)
  keys.forEach(key => {
    const { nextPath, nextValue } = nextIterationDetails(path, key, value)
    circularDependencyTraversal(condition, callback, config, key, nextPath, nextValue, value, state, stack)
  })
  if (root) stack.clear()
  return state
}

const nonCircularDependencyTraversal: TraversalNonCircular = (condition, callback, config, key, path, value, parent, state) => {
  const ok = condition(config, key, value, path, parent)
  /* istanbul ignore next */
  if (config.exitEarly) return state
  if (ok) callback(key, value, path, state, parent)
  const type = getType(value)
  if (!isIterableType(type)) return state
  const keys = getKeysFromIterable(value, type)
  keys.forEach(key => {
    const { nextPath, nextValue } = nextIterationDetails(path, key, value)
    nonCircularDependencyTraversal(condition, callback, config, key, nextPath, nextValue, value, state)
  })
  return state
}

const traversal: Traversal = (target, condition, callback, options, state) => {
  if (typeof callback !== 'function') throw new Error(errorMessage('callback', 'a function'))
  if (!(typeof options === 'object' && !Array.isArray(options))) throw new Error(errorMessage('options', 'an object'))
  if (!Array.isArray(options.depth)) throw new Error(errorMessage('options.depth', 'an array'))
  const [startDepth, maxDepth] = options.depth
  if (startDepth !== void 0 && typeof startDepth !== 'number') throw new Error(errorMessage('options.depth.0', 'a number'))
  if (maxDepth !== void 0) {
    const maxDepthType = typeof maxDepth
    if (!['number', 'string'].includes(maxDepthType)) throw new Error(errorMessage('options.depth.1', 'a number or a string'))
    if (maxDepthType === 'string' && maxDepth !== '*') throw new Error("Only valid string value in options.depth.1 is '*'.")
  }
  const config = { depth: Object.freeze([options.depth[0] ?? 0, options.depth[1] ?? '*']), exitEarly: false } as Config
  const initialArgs = [condition, callback, config, '', [], target, void 0, state] as TraversalArgs
  if (getConfig().detectCircularReferences) return circularDependencyTraversal(...initialArgs, referenceStack(), true)
  return nonCircularDependencyTraversal(...initialArgs)
}

export const createTraversal: TraversalCreator<unknown> = condition => (target, callback, options, state) =>
  traversal(target, condition, callback, options ?? { depth: [0, '*'] }, state ?? {})

const condition: Condition = (config, key, value, path) => !(path.length < config.depth[0] || config.depth[1] < path.length)

const traverseBetweenDepthRange = createTraversal(condition)

/**
 * Invokes a callback function for every data point in the data structure of the target value to let you do read and write operations.
 * A depth option is available to narrow down the iteration scope.
 */
export const traverse = <T = unknown, S extends Record<string, unknown> = Record<string, unknown>>(
  target: T,
  callback: Callback,
  options?: Options,
  state?: S
): S => traverseBetweenDepthRange(target, callback, options, state)
