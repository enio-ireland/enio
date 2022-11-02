import { sameStructure } from '../sameStructure/sameStructure'
import { setConfig } from '../shared/consts'

describe('sameStructure', () => {
  beforeEach(() => setConfig({ samePositionOfOwnProperties: false }))

  it('should return false for mismatched primitive types', () => {
    expect(sameStructure(Symbol(), '')).toEqual(false)
    expect(sameStructure(true, NaN)).toEqual(false)
  })

  it('should return false for lists that do not match in length', () => {
    expect(sameStructure(new Array(1).fill(1), new Array(5).fill(1))).toEqual(false)
    expect(sameStructure([0, 1], [0, 1, 2])).toEqual(false)
  })

  it('should return false for objects that do not have the same properties', () => {
    expect(sameStructure({}, { foo: 'bar' })).toEqual(false)
    expect(sameStructure({ hello: 'world' }, { foo: 'bar' })).toEqual(false)
  })

  it('should return matching data type for primitives values', () => {
    expect(sameStructure(42, 77)).toEqual('number')
    expect(sameStructure(null, null)).toEqual('null')
    expect(sameStructure('hello world', 'foo bar')).toEqual('string')
  })

  it('should return matching data type for values with empty array', () => {
    expect(sameStructure([], new Array(0))).toEqual('array')
    expect(sameStructure([], new Array(100 /* Also works because it is considered empty */))).toEqual('array')
  })

  it('should return matching data type for values with empty array', () => {
    expect(sameStructure({}, {})).toEqual('object')
  })

  it('should return matching data type for lists of same length', () => {
    expect(sameStructure(['apples', 'pears'], ['bananas', 'blueberries'])).toEqual('array')
  })

  it('should return matching data type for objects containing the same properties', () => {
    expect(sameStructure({ a: 0 }, { a: 100 })).toEqual('object')
    expect(sameStructure({ a: 0, b: '' }, { a: 100, b: false })).toEqual('object')
  })

  it('should return matching data type for objects containing the same properties (unordered)', () => {
    expect(sameStructure({ b: -50, a: 'box' }, { a: 100, b: 'Fizz!' })).toEqual('object')
  })
})

describe('sameStructure - with config samePositionOfOwnProperties: true', () => {
  beforeEach(() => setConfig({ samePositionOfOwnProperties: true }))

  afterEach(() => setConfig({ samePositionOfOwnProperties: false }))

  it('should return false for objects containing the same properties (unordered)', () => {
    expect(sameStructure({ b: -50, a: 'box' }, { a: 100, b: 'Fizz!' })).toEqual(false)
  })
})
