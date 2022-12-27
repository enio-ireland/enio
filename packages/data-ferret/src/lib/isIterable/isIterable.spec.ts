import { isIterable } from '../isIterable/isIterable'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'

describe('isIterable', () => {
  it('should return true for object and array values, regardless of having items or values or being empty', () => {
    expect(isIterable(['cake', 'cookies'])).toEqual(true)
    expect(isIterable({ activity: 'jump' })).toEqual(true)
    expect(isIterable([])).toEqual(true)
    expect(isIterable({})).toEqual(true)
  })

  it('should return false for non-iterable values', () => {
    expect(isIterable(Symbol())).toEqual(false)
    expect(isIterable(80)).toEqual(false)
    expect(isIterable('')).toEqual(false)
    expect(isIterable(null)).toEqual(false)
    expect(isIterable(void 0)).toEqual(false)
  })
})

describe('isIterable - extended iterable class types', () => {
  beforeEach(() => {
    registerIterableClass<Map<unknown, unknown>>(
      Map,
      map => Array.from(map.keys()) as string[],
      (map, key) => map.get(key),
      (map, value, key) => map.set(key, value)
    )
    registerIterableClass<Set<unknown>>(
      Set,
      set => Array.from(set.keys()) as string[],
      (_, key) => key,
      (set, value) => set.add(value)
    )
  })

  afterEach(() => deregisterIterableClass())

  it('should return true for classes has been registered', () => {
    expect(isIterable(new Map())).toEqual(true)
    expect(isIterable(new Set())).toEqual(true)
  })
})
