import { registerClassTypes } from '../registerClassTypes/registerClassTypes'
import { deregisterClassTypes } from '../deregisterClassTypes/deregisterClassTypes'
import { sameType } from './sameType'

describe('sameType', () => {
  it('returns the matching data type for both values', () => {
    expect(sameType(5, -100)).toEqual('number')
    expect(sameType('hello', 'world')).toEqual('string')
    expect(sameType({ foo: 'bar' }, {})).toEqual('object')
    expect(sameType([], new Array(4))).toEqual('array')
    expect(sameType(Symbol(), Symbol('alpha'))).toEqual('symbol')
  })

  it('returns false when data type for each value is different', () => {
    expect(sameType(5, '5')).toEqual(false)
    expect(sameType(0, false)).toEqual(false)
    expect(sameType([], {})).toEqual(false)
  })
})

describe('sameType - extended class types', () => {
  class A {}
  class B {}

  beforeEach(() => registerClassTypes(A, B))

  afterEach(() => deregisterClassTypes(A, B))

  it('returns the matching data type for both values which happens to be the name of the class both values are instance of', () => {
    expect(sameType(new A(), new A())).toEqual('A')
  })

  it('returns false for values that are not instance of the same class', () => {
    expect(sameType({}, new A())).toEqual(false)
    expect(sameType(new A(), new B())).toEqual(false)
  })
})
