import { locateCircularReference } from './locateCircularReference'

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
