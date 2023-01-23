import { locateCircularReference } from './locateCircularReference'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'

describe('locateCircularReference', () => {
  let input: unknown

  beforeEach(() => {
    const ar: unknown[] = []
    ar[0] = ar
    const ob = { a: { b: { c: {} } } }
    ob.a.b.c = ob
    input = { ar, ob }
  })

  it('throws an error when incorrect arguments are passed', () => {
    // @ts-expect-error TS2345 - deliberately passing wrong parameters
    expect(() => locateCircularReference(null, null)).toThrowError('Invalid maxResults argument.')
    // @ts-expect-error TS2345 - deliberately passing wrong parameters
    expect(() => locateCircularReference(null, '@')).toThrowError('Invalid maxResults argument.')
    expect(() => locateCircularReference(null, -10)).toThrowError('Invalid maxResults argument.')
  })

  it('returns an empty list when no circular references found', () => {
    expect(locateCircularReference(void 0)).toEqual([])
    expect(locateCircularReference(null)).toEqual([])
    expect(locateCircularReference(0)).toEqual([])
    expect(locateCircularReference({})).toEqual([])
    expect(locateCircularReference([])).toEqual([])
    expect(locateCircularReference({ a: [{ l: ['a', 'b'] }] })).toEqual([])
  })

  it('returns first of circular reference encountered by default', () => {
    expect(locateCircularReference(input).length).toEqual(1)
  })

  it('returns a list of circular references', () => {
    const result = locateCircularReference(input, '*')
    expect(result.length).toEqual(2)
    expect(result[0].toString()).toEqual('ar·0 → ar')
    expect(result[1].toString()).toEqual('ob·a·b·c → ob')
  })

  it('returns a designated maximum circular references', () => {
    expect(locateCircularReference(input, 1).length).toEqual(1)
  })
})

describe('locateCircularReference - with extended iterable class types', () => {
  beforeEach(() => {
    registerIterableClass<Map<unknown, unknown>>(
      Map,
      map => Array.from(map.keys()) as string[],
      (map, key) => map.get(key),
      (map, value, key) => map.set(key, value)
    )
  })

  afterEach(() => deregisterIterableClass())

  it('returns a list of circular references are encountered', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = new Map<string, Map<string, any>>()
    map.set('emerald', map)
    map.set('ruby', map)
    map.set('sapphire', map)
    expect(locateCircularReference(map, '*').length).toEqual(3)
  })
})
