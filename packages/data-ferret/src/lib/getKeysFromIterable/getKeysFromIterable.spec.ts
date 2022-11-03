import { setConfig } from '../shared/consts'
import { getKeysFromIterable } from '../getKeysFromIterable/getKeysFromIterable'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'

describe('getKeysFromIterable', () => {
  beforeEach(() => setConfig({ detectCircularReferences: false }))

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
  beforeEach(() => (setConfig({ detectCircularReferences: false }), registerIterableClass()))

  afterEach(() => (setConfig({ detectCircularReferences: false }), registerIterableClass()))

  it('should return keys from Map because it has been registered', () => {
    const rosterWithAge = new Map<string, number>()
    rosterWithAge.set('Tom', 33)
    rosterWithAge.set('Luca', 21)
    registerIterableClass({ classRef: Map, getKeys: map => Array.from(map.keys()) as string[] })
    expect(getKeysFromIterable(rosterWithAge, 'Map')).toEqual(['Tom', 'Luca'])
  })
})

describe('getKeysFromIterable - config detectCircularReferences:true', () => {
  beforeEach(() => setConfig({ detectCircularReferences: true }))

  afterEach(() => setConfig({ detectCircularReferences: false }))

  it('should exclude any marker properties added to track references', () => {
    expect(getKeysFromIterable({ pizza: 'hawaiian', __$96184805415709618480541570: Symbol() }, 'object')).toEqual(['pizza'])
    expect(getKeysFromIterable({ 0: 'apple', 1: 'banana', __$96184805415709618480541570: Symbol() }, 'array')).toEqual(['0', '1'])
  })
})
