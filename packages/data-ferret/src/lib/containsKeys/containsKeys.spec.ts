import { containsKeys } from './containsKeys'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'

describe('containsKeys', () => {
  it('should return true when key is key is found in value', () => {
    expect(containsKeys({ foo: 'bar' }, ['foo'])).toEqual(true)
  })

  it('should return true when a particular index/item exists in a list', () => {
    expect(containsKeys(['apple', 'pineapple'], ['0', '1'])).toEqual(true)
  })

  it('should return false when expected key list is empty', () => {
    expect(containsKeys({ foo: 'bar' }, [])).toEqual(false)
  })

  it('should return false when value is not iterable', () => {
    expect(containsKeys(null, ['foo'])).toEqual(false)
    expect(containsKeys(() => void 0, ['foo'])).toEqual(false)
    expect(containsKeys(42, ['foo'])).toEqual(false)
    expect(containsKeys(true, ['foo'])).toEqual(false)
  })
})

describe('containsKeys - extended iterable class types', () => {
  beforeEach(() =>
    registerIterableClass(
      { classRef: Map, getKeys: map => Array.from(map.keys()) as string[] },
      { classRef: Set, getKeys: set => Array.from(set.keys()) as string[] }
    )
  )

  afterEach(() => registerIterableClass())

  it('should return list of known iterable classes which should include those that have been registered', () => {
    const map = new Map<string, number>()
    map.set('emerald', 65)
    expect(containsKeys(map, ['emerald'])).toEqual(true)

    const set = new Set<string>()
    set.add('ruby')
    expect(containsKeys(set, ['ruby'])).toEqual(true)
  })
})