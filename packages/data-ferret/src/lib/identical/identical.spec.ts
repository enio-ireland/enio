import { setConfig } from '../shared/consts'
import { identical } from './identical'

describe('identical', () => {
  beforeEach(() => setConfig({ samePositionOfOwnProperties: false }))

  it('should return true when strict check quality check is true', () => {
    expect(identical(25, 25)).toEqual(true)
    expect(identical(null, null)).toEqual(true)
    expect(identical(undefined, void 0)).toEqual(true)
    expect(identical('hello world', 'hello world')).toEqual(true)
  })

  it('should return true when strict check quality check is true for non-primitive data type references', () => {
    const array: unknown[] = []
    expect(identical(array, array)).toEqual(true)

    const object = {}
    expect(identical(object, object)).toEqual(true)
  })

  it('should return true for empty iterables of the same type', () => {
    expect(identical({}, {})).toEqual(true)
    expect(identical([], [])).toEqual(true)
  })

  it('should return true when complex types have same key value pairs', () => {
    expect(identical({ a: 1 }, { a: 1 })).toEqual(true)
    expect(identical(['banana'], ['banana'])).toEqual(true)
  })

  it('should return true for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(identical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(true)
  })

  it('should return false for lists with items in the wrong order', () => {
    expect(identical([1, 2, 3], [3, 1, 2])).toEqual(false)
    expect(identical([4, 1, 2], [3, 2, 4])).toEqual(false)
  })

  it('should return false for values that do not match', () => {
    expect(identical(Symbol(), Symbol())).toEqual(false)
    expect(identical('', [])).toEqual(false)
    expect(identical([], {})).toEqual(false)
    expect(identical(-23, 23)).toEqual(false)
    expect(identical(undefined, null)).toEqual(false)
  })
})

describe('identical - with config samePositionOfOwnProperties: true', () => {
  beforeEach(() => setConfig({ samePositionOfOwnProperties: true }))

  afterEach(() => setConfig({ samePositionOfOwnProperties: false }))

  it('should return false for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(identical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(false)
  })
})
