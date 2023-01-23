import { containsKeys } from './containsKeys'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'

describe('containsKeys', () => {
  it('returns true when key is key is found in value', () => {
    expect(containsKeys({ foo: 'bar' }, ['foo'])).toEqual(true)
  })

  it('returns true when a particular index/item exists in a list', () => {
    expect(containsKeys(['apple', 'pineapple'], ['0', '1'])).toEqual(true)
  })

  it('returns false when expected key list is empty', () => {
    expect(containsKeys({ foo: 'bar' }, [])).toEqual(false)
  })

  it('returns false when value is not iterable', () => {
    expect(containsKeys(null, ['foo'])).toEqual(false)
    expect(containsKeys(() => void 0, ['foo'])).toEqual(false)
    expect(containsKeys(42, ['foo'])).toEqual(false)
    expect(containsKeys(true, ['foo'])).toEqual(false)
  })
})

describe('containsKeys - with extended iterable class types', () => {
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

  it('returns list of known iterable classes which should include those that have been registered', () => {
    const map = new Map<string, number>()
    map.set('emerald', 65)
    expect(containsKeys(map, ['emerald'])).toEqual(true)

    const set = new Set<string>()
    set.add('ruby')
    expect(containsKeys(set, ['ruby'])).toEqual(true)
  })
})
