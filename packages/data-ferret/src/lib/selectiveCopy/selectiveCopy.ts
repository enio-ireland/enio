/* eslint-disable @typescript-eslint/no-unused-vars */
import { getIterableOperators } from '../getIterableOperators/getIterableOperators'
import { getType } from '../getType/getType'
import { isIterableType } from '../isIterableType/isIterableType'
import { Options, Predicate, DataPointOperation, DataPoint, CircularReference } from './selectiveCopy.model'
import { ReferenceStack } from '../referenceStack/referenceStack.model'
import { referenceStack } from '../referenceStack/referenceStack'
import { getConfig } from '../shared/consts'

export const selectiveCopyRecursive = <T extends Record<string, unknown>>(
  target: T,
  path: string[],
  includeKey: Predicate,
  skipFunctions: boolean,
  recordSkip: DataPointOperation
): Partial<T> => {
  const type = getType(target)
  if (!isIterableType(type)) return target
  const { instantiate, getKeys, read, write } = getIterableOperators(type)
  const iterableInstance = instantiate()
  const keys = getKeys(target)
  for (let i = 0; i < keys.length; i += 1) {
    const nextKey = keys[i]
    const nextTarget = read(target, nextKey)
    const nextPath = path.concat(nextKey)
    const nextType = getType(nextTarget)
    if (!includeKey(nextTarget, nextPath, nextKey, nextType) || (skipFunctions && nextType === 'function')) {
      recordSkip(nextTarget, nextPath, nextKey, nextType)
      continue
    }
    write(
      iterableInstance,
      selectiveCopyRecursive(nextTarget as Record<string, unknown>, nextPath, includeKey, skipFunctions, recordSkip),
      nextKey
    )
  }
  return iterableInstance as Partial<T>
}

/**
 * Creates a clone of the target. Options can be provided to selectively copy values.
 * This algorithm is able detect circular references, and optionally clone them.
 */
export const selectiveCopyForCircularReferencesRecursive = <T extends Record<string, unknown>>(
  target: T,
  path: string[],
  includeKey: Predicate,
  skipFunctions: boolean,
  recordSkip: DataPointOperation,
  stack: ReferenceStack,
  circularRefs: CircularReference[],
  root = false
): Partial<T> => {
  root && stack.add(target)
  const type = getType(target)
  if (!isIterableType(type)) return target
  const { instantiate, getKeys, read, write } = getIterableOperators(type)
  const iterableInstance = instantiate()
  const keys = getKeys(target)
  for (let i = 0; i < keys.length; i += 1) {
    const nextKey = keys[i]
    const nextTarget = read(target, nextKey)
    const nextPath = path.concat(nextKey)
    const nextType = getType(nextTarget)
    if (!includeKey(nextTarget, nextPath, nextKey, nextType) || (skipFunctions && nextType === 'function')) {
      recordSkip(nextTarget, nextPath, nextKey, nextType)
      continue
    }
    const hasCircularRef = stack.exists(nextTarget)
    if (hasCircularRef) {
      circularRefs.push({ startPath: nextPath, destinationPath: nextPath.slice(0, stack.lastSeen(nextTarget) as number) })
      continue
    }
    stack.add(nextTarget)
    write(
      iterableInstance,
      selectiveCopyForCircularReferencesRecursive(
        nextTarget as Record<string, unknown>,
        nextPath,
        includeKey,
        skipFunctions,
        recordSkip,
        stack,
        circularRefs
      ),
      nextKey
    )
  }
  if (root) {
    circularRefs.forEach(({ startPath, destinationPath }) => {
      let [start, destination] = [iterableInstance, iterableInstance] as [Record<string, unknown>, Record<string, unknown>]
      for (let i = 0; i < startPath.length; i += 1) {
        if (i === startPath.length - 1) {
          for (let j = 0; j < destinationPath.length; j += 1) {
            if (j === destinationPath.length - 1) {
              start[startPath[i]] = destination[destinationPath[j]]
              break
            } else {
              destination = destination[destinationPath[j]] as Record<string, unknown>
            }
          }
          break
        } else {
          start = start[startPath[i]] as Record<string, unknown>
        }
      }
    })
    stack.clear()
  }
  return iterableInstance as Partial<T>
}

/**
 * Creates a clone of the target. Options can be provided to selectively copy values.
 * Due to JavaScript language limitations context of bound functions is not known, thus functions cannot be reliably cloned.
 * This algorithm instead copies function references by default instead. For the same reason getters and setters are not replicate, only their
 * return values. This algorithm can replicate circular references, when configured to do so.
 * It supports other iterable data types, provided these have been made known using [registerIterableClass](https://github.com/enio-ireland/enio/tree/develop/packages/data-ferret/src/lib/registerIterableClass).
 */
export const selectiveCopy = <T = unknown>(target: T, options?: Options): { clone: Partial<T>; skipped: DataPoint[] } => {
  if (options !== void 0 && getType(options) !== 'object') throw new Error('Invalid options argument.')
  if (!options) options = {}
  if (!options.skipFunctions) options.skipFunctions = false
  const keys = ['includeKeys', 'excludeKeys', 'include', 'exclude']
  let found = ''
  for (let i = 0; i < keys.length; i += 1) {
    const included = keys[i] in options
    if (found && included) throw new Error(`Options ${found} and ${keys[i]} are mutually exclusive.`)
    if (included) found = keys[i]
  }
  const { includeKeys, excludeKeys, include, exclude, skipFunctions } = options as Required<Options>
  let includeKey: Predicate = (target, path, key, dataType) => true
  switch (found) {
    case 'includeKeys':
      includeKey = (target, path, key, dataType) => (path.length === 1 ? includeKeys.includes(key as string) : true)
      break
    case 'excludeKeys':
      includeKey = (target, path, key, dataType) => (path.length === 1 ? !excludeKeys.includes(key as string) : true)
      break
    case 'include':
      includeKey = include
      break
    case 'exclude':
      includeKey = (target, path, key, dataType) => !exclude(target, path, key, dataType)
      break
  }
  const skipped: DataPoint[] = []
  const recordSkip: DataPointOperation = (target, path, key, dataType) => skipped.push({ target, path, key, dataType })
  let clone: T
  if (getConfig().detectCircularReferences) {
    clone = selectiveCopyForCircularReferencesRecursive(
      target as Record<string, unknown>,
      [],
      includeKey,
      skipFunctions,
      recordSkip,
      referenceStack(),
      [],
      true
    ) as T
  } else {
    clone = selectiveCopyRecursive(target as Record<string, unknown>, [], includeKey, skipFunctions, recordSkip) as T
  }
  return { clone, skipped }
}
