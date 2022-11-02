import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'

describe('getKeysFromIterable', () => {
  it('return keys from array', () => {
    expect(getKeysFromIterable(['apple', 'banana', 'orange'], 'array')).toEqual(['0', '1', '2'])
  })

  it('should return keys from object', () => {
    expect(getKeysFromIterable({ name: 'J. D. Salinger', role: 'Author' }, 'object')).toEqual(['name', 'role'])
  })

  it('should return empty list from data whose iterable type has not been registered', () => {
    expect(getKeysFromIterable({ $: 5 }, 'unknownType')).toEqual([])
  })
})

describe('getKeysFromIterable - extended iterable class types', () => {
  beforeEach(() => registerIterableClass())

  afterEach(() => registerIterableClass())

  it('should return keys from Map becaue it has been registered', () => {
    const rosterWithAge = new Map<string, number>()
    rosterWithAge.set('Tom', 33)
    rosterWithAge.set('Luca', 21)
    registerIterableClass({ classRef: Map, getKeys: map => Array.from(map.keys()) as string[] })
    expect(getKeysFromIterable(rosterWithAge, 'Map')).toEqual(['Tom', 'Luca'])
  })
})
