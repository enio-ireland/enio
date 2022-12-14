import { hasCircularReference } from './hasCircularReference'

describe('hasCircularReference', () => {
  it('should return false for values that are non-iterable values', () => {
    expect(hasCircularReference(5)).toEqual(false)
    expect(hasCircularReference('foo bar')).toEqual(false)
    expect(hasCircularReference(null)).toEqual(false)
    expect(hasCircularReference(void 0)).toEqual(false)
    expect(hasCircularReference(Symbol())).toEqual(false)
    expect(hasCircularReference(true)).toEqual(false)
  })

  it('should return false for iterable values that do not have circular references', () => {
    expect(hasCircularReference({})).toEqual(false)
    expect(hasCircularReference([])).toEqual(false)
    expect(hasCircularReference({ a: { b: { c: {} } } })).toEqual(false)
  })

  it('should return true for values with circular reference', () => {
    const selfContainingArray: unknown[] = []
    selfContainingArray[0] = selfContainingArray
    expect(hasCircularReference(selfContainingArray)).toEqual(true)

    const selfReferencingObject = { a: { b: { c: {} } } }
    selfReferencingObject.a.b.c = selfReferencingObject
    expect(hasCircularReference(selfReferencingObject)).toEqual(true)
  })
})
