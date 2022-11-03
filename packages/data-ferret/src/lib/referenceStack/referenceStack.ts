import { ReferenceStack } from './referenceStack.model'
import { marker } from '../marker/marker'
import { isIterable } from '../isIterable/isIterable'

export const referenceStack = (): ReferenceStack => {
  const records = new Map<symbol, [string, Iterable<string>]>()
  const flag = marker()

  const add = (reference: unknown) => {
    if (!isIterable(reference) || exists(reference)) return
    // @ts-expect-error TS2339 because accessing property of unknown type presumed to be iterable.
    reference[flag] = Symbol()
    // @ts-expect-error TS2339 because accessing property of unknown type presumed to be iterable.
    records.set(reference[flag], [flag, reference])
  }

  // @ts-expect-error TS2339 because accessing property of unknown type presumed to be iterable.
  const exists = (reference: unknown) => (isIterable(reference) ? flag in reference && records.has(reference[flag]) : false)

  // @ts-expect-error TS2339 because accessing property of unknown type presumed to be iterable.
  const clear = () => (records.forEach(([key, reference]) => delete reference[key]), records.clear())

  return {
    add: reference => add(reference),
    exists: reference => exists(reference),
    clear: () => clear(),
    get size() {
      return records.size
    }
  }
}
