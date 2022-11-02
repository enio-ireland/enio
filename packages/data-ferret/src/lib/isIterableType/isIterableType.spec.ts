import { isIterableType } from './isIterableType'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'

describe('isIterableType', () => {
  it("should return true for 'array' data type", () => {
    expect(isIterableType('array')).toEqual(true)
  })

  it("should return true for 'object' data type", () => {
    expect(isIterableType('object')).toEqual(true)
  })
})

describe('isIterableType - extended iterable class types', () => {
  beforeEach(() =>
    registerIterableClass(
      { classRef: Map, getKeys: map => map.keys() as string[] },
      { classRef: Set, getKeys: map => map.keys() as string[] }
    )
  )

  afterEach(() => registerIterableClass())

  it('should return true for any data type corresponding to registered iterable class', () => {
    expect(isIterableType('Map')).toEqual(true)
    expect(isIterableType('Set')).toEqual(true)
  })
})
