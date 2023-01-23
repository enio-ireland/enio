import { hasCircularReference } from './hasCircularReference'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'

describe('hasCircularReference', () => {
  it('returns false for values that are non-iterable values', () => {
    expect(hasCircularReference(5)).toEqual(false)
    expect(hasCircularReference('foo bar')).toEqual(false)
    expect(hasCircularReference(null)).toEqual(false)
    expect(hasCircularReference(void 0)).toEqual(false)
    expect(hasCircularReference(Symbol())).toEqual(false)
    expect(hasCircularReference(true)).toEqual(false)
  })

  it('returns false for iterable values that do not have circular references', () => {
    expect(hasCircularReference({})).toEqual(false)
    expect(hasCircularReference([])).toEqual(false)
    expect(hasCircularReference({ a: { b: { c: {} } } })).toEqual(false)
  })

  it('returns true for values with circular reference', () => {
    const selfContainingArray: unknown[] = []
    selfContainingArray[0] = selfContainingArray
    expect(hasCircularReference(selfContainingArray)).toEqual(true)

    const selfReferencingObject = { a: { b: { c: {} } } }
    selfReferencingObject.a.b.c = selfReferencingObject
    expect(hasCircularReference(selfReferencingObject)).toEqual(true)
  })
})

describe('hasCircularReference - with extended iterable class types', () => {
  beforeEach(() => {
    registerIterableClass<Map<unknown, unknown>>(
      Map,
      map => Array.from(map.keys()) as string[],
      (map, key) => map.get(key),
      (map, value, key) => map.set(key, value)
    )
  })

  afterEach(() => deregisterIterableClass())

  it('returns false when no circular references are encountered', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = new Map<string, number>()
    map.set('sapphire', 35)
    expect(hasCircularReference(map)).toEqual(false)
  })

  it('returns true when encountering a circular reference', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = new Map<string, Map<string, any>>()
    map.set('emerald', map)
    expect(hasCircularReference(map)).toEqual(true)
  })
})
