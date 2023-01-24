import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { RegisteredIterableClassEntry } from '../shared/model'
import { getIterableOperators } from './getIterableOperators'

describe('getIterableOperators', () => {
  beforeEach(() => deregisterIterableClass())

  afterAll(() => deregisterIterableClass())

  it('returns operators of a registered class', () => {
    // arrange
    class A {}
    const getKeys: RegisteredIterableClassEntry['getKeys'] = target => Object.keys(target)
    const read: RegisteredIterableClassEntry['read'] = (target, key) => (target as Record<string, unknown>)[key as string]
    const write: RegisteredIterableClassEntry['write'] = (target, value, key) =>
      ((target as Record<string, unknown>)[key as string] = value)
    const remove: RegisteredIterableClassEntry['remove'] = (target, key) => delete (target as Record<string, unknown>)[key as string]
    const instantiate: RegisteredIterableClassEntry['instantiate'] = () => new A()
    registerIterableClass(A, getKeys, read, write, remove, instantiate)

    // act
    const operators = getIterableOperators(A.name)

    // assert
    expect(typeof operators.getKeys).toEqual('function')
    expect(operators.getKeys).not.toEqual(getKeys)
    expect(operators.read).toEqual(read)
    expect(operators.write).toEqual(write)
    expect(operators.remove).toEqual(remove)
    expect(operators.instantiate).toEqual(instantiate)
  })
})
