import { getIterableTypes } from './getIterableTypes'
import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'

describe('getIterableTypes', () => {
  it('should return list of known iterable classes, containing object and array by default', () => {
    expect(getIterableTypes()).toContain('array')
    expect(getIterableTypes()).toContain('object')
  })
})

describe('getIterableTypes - extended iterable class types', () => {
  beforeEach(() => {
    registerIterableClass<Map<unknown, unknown>>(
      Map,
      map => Array.from(map.keys()) as string[],
      (map, value, key) => map.set(key, value)
    )
    registerIterableClass<Set<unknown>>(
      Set,
      set => Array.from(set.keys()) as string[],
      (set, value) => set.add(value)
    )
  })

  afterEach(() => deregisterIterableClass())

  it('should return list of known iterable classes which should include those that have been registered', () => {
    expect(getIterableTypes()).toContain('Map')
    expect(getIterableTypes()).toContain('Set')
    expect(getIterableTypes()).toContain('array')
    expect(getIterableTypes()).toContain('object')
  })
})
