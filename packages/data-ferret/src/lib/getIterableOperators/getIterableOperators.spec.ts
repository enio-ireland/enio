import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { RegisteredIterableClassEntry } from '../shared/model'
import { getIterableOperators } from './getIterableOperators'

describe('getIterableOperators', () => {
  beforeEach(() => deregisterIterableClass())

  afterAll(() => deregisterIterableClass())

  it('returns operators of a registered class', () => {
    // arrange
    class A { }
    const instantiate: RegisteredIterableClassEntry['instantiate'] = () => new A()
    const getKeys: RegisteredIterableClassEntry['getKeys'] = (target) => Object.keys(target)
    const read: RegisteredIterableClassEntry['read'] = (target, key) => (target as Record<string, unknown>)[key as string]
    const write: RegisteredIterableClassEntry['write'] = (target, value, key) => (target as Record<string, unknown>)[key as string] = value
    registerIterableClass(A, getKeys, read, write, instantiate)

    // act
    const operators = getIterableOperators(A.name)

    // assert
    expect(operators.instantiate).toEqual(instantiate)
    expect(operators.getKeys).toEqual(getKeys)
    expect(operators.read).toEqual(read)
    expect(operators.write).toEqual(write)
  })
})
