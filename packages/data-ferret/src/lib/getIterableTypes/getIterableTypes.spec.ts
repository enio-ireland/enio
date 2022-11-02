import { getIterableTypes } from './getIterableTypes'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'

describe('getIterableTypes', () => {
  it('should return list of known iterable classes, by default object and array', () => {
    expect(getIterableTypes()).toEqual(['array', 'object'])
  })
})

describe('getIterableTypes - extended iterable class types', () => {
  beforeEach(() =>
    registerIterableClass(
      { classRef: Map, getKeys: map => Array.from(map.keys()) as string[] },
      { classRef: Set, getKeys: map => Array.from(map.keys()) as string[] }
    )
  )

  afterEach(() => registerIterableClass())

  it('should return list of known iterable classes which should include those that have been registered', () => {
    expect(getIterableTypes()).toEqual(['Map', 'Set', 'array', 'object'])
  })
})
