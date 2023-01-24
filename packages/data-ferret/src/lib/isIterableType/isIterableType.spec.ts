import { isIterableType } from './isIterableType'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'

describe('isIterableType', () => {
  it("should return true for 'array' data type", () => {
    expect(isIterableType('array')).toEqual(true)
  })

  it("should return true for 'object' data type", () => {
    expect(isIterableType('object')).toEqual(true)
  })
})

describe('isIterableType - with extended iterable class types', () => {
  beforeEach(() => {
    registerIterableClass<Map<unknown, unknown>>(
      Map,
      map => Array.from(map.keys()) as string[],
      (map, key) => map.get(key),
      (map, value, key) => map.set(key, value),
      (map, key) => map.delete(key),
    )
    registerIterableClass<Set<unknown>>(
      Set,
      set => Array.from(set.keys()) as string[],
      (_, key) => key,
      (set, value) => set.add(value),
      (set, key) => set.delete(key)
    )
  })

  afterEach(() => deregisterIterableClass())

  it('returns true for any data type corresponding to registered iterable class', () => {
    expect(isIterableType('Map')).toEqual(true)
    expect(isIterableType('Set')).toEqual(true)
  })
})
