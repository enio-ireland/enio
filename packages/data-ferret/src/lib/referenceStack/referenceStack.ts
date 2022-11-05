import { ReferenceStack, UnknownIterableKey, UnknownIterable } from './referenceStack.model'
import { marker } from '../marker/marker'
import { isIterable } from '../isIterable/isIterable'

export const referenceStack = (): ReferenceStack => {
  const records = new Map<symbol, [UnknownIterableKey, UnknownIterable]>()
  const flag = marker() as UnknownIterableKey

  const add = (reference: UnknownIterable): void => {
    if (!isIterable(reference) || exists(reference)) return
    ;(reference[flag] as symbol) = Symbol()
    records.set(reference[flag], [flag, reference])
  }

  const exists = (reference: UnknownIterable) => (isIterable(reference) ? flag in reference && records.has(reference[flag]) : false)

  const clear = () => (records.forEach(([key, reference]) => delete reference[key]), records.clear())

  return {
    add: reference => add(reference as UnknownIterable),
    exists: reference => exists(reference as UnknownIterable),
    clear: () => clear(),
    get size() {
      return records.size
    }
  }
}
