import { ReferenceStack } from './referenceStack.model'
import { UnknownIterable, UnknownIterableKey } from '../shared/model'
import { marker } from '../marker/marker'
import { isIterable } from '../isIterable/isIterable'

export const referenceStack = (): ReferenceStack => {
  const records = new Map<symbol, [UnknownIterableKey, UnknownIterable, number]>()
  const flag = marker() as UnknownIterableKey

  const add = (ref: UnknownIterable): void => {
    if (!isIterable(ref) || exists(ref)) return
    ;(ref[flag] as symbol) = Symbol()
    records.set(ref[flag], [flag, ref, records.size])
  }

  const exists = (ref: UnknownIterable) => (isIterable(ref) ? flag in ref && records.has(ref[flag]) : false)

  const lastSeen = (ref: UnknownIterable): number | null => {
    if (!isIterable(ref)) return null
    const record = records.get(ref[flag])
    return record ? record[2] - records.size : null
  }

  const clear = () => (records.forEach(([key, reference]) => delete reference[key]), records.clear())

  return {
    add: reference => add(reference as UnknownIterable),
    exists: reference => exists(reference as UnknownIterable),
    lastSeen: reference => lastSeen(reference as UnknownIterable),
    clear: () => clear(),
    get size() {
      return records.size
    }
  }
}
