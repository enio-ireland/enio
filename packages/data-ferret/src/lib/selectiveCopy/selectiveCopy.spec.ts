import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { selectiveCopy } from './selectiveCopy'
import { setConfig } from '../shared/consts'
import { isIdentical } from '../isIdentical/isIdentical'

describe('selectiveCopy', () => {
  it('clones primitive type data', () => {
    const symbol = Symbol()
    expect(selectiveCopy(symbol).clone).toEqual(symbol)
    expect(selectiveCopy('open sesame').clone).toEqual('open sesame')
    expect(selectiveCopy(5).clone).toEqual(5)
    expect(selectiveCopy(NaN).clone).toEqual(NaN)
    expect(selectiveCopy(true).clone).toEqual(true)
    expect(selectiveCopy(BigInt(9007199254740991)).clone).toEqual(BigInt(9007199254740991))
    expect(selectiveCopy(void 0).clone).toBeUndefined()
    expect(selectiveCopy(null).clone).toBeNull()
    const fn = () => {}
    expect(selectiveCopy(fn).clone).toEqual(fn)
  })

  it('throw error when second argument is not an object', () => {
    // @ts-expect-error Testing invalid input
    expect(() => selectiveCopy(5, null)).toThrow('Invalid options argument.')

    // @ts-expect-error Testing invalid input
    expect(() => selectiveCopy(5, [])).toThrowError('Invalid options argument.')
  })

  it('does not allow more than one behaviour to be specified', () => {
    expect(() => selectiveCopy(42, { includeKeys: [], exclude: () => true })).toThrowError(
      'Options includeKeys and exclude are mutually exclusive.'
    )
  })

  it('should copy function references by default', () => {
    const target = { method: () => true }
    const { clone, skipped } = selectiveCopy(target)
    expect(clone.method).toBe(target.method)
    expect(skipped).toEqual([])
  })

  it('should skip copying functions when flagged', () => {
    const target = { method: () => true }
    const { clone, skipped } = selectiveCopy(target, { skipFunctions: true })
    expect(clone).toEqual({})
    expect(skipped).toEqual([{ target: target.method, path: ['method'], key: 'method', dataType: 'function' }])
  })

  it('copies top-level keys that have been specified', () => {
    const target = { a: 5, b: 'hello world', c: [0] }
    const { clone, skipped } = selectiveCopy(target, { includeKeys: ['b', 'c'] })
    expect(clone).toEqual({ b: 'hello world', c: [0] })
    expect(skipped).toEqual([{ target: 5, path: ['a'], key: 'a', dataType: 'number' }])
  })

  it('does not copy top-level keys that have been specified', () => {
    const target = { a: 7, b: 'foo bar', c: { b: 'hey' } }
    const { clone, skipped } = selectiveCopy(target, { excludeKeys: ['b'] })
    expect(clone).toEqual({ a: 7, c: { b: 'hey' } })
    expect(skipped).toEqual([{ target: 'foo bar', path: ['b'], key: 'b', dataType: 'string' }])
  })

  it('selectively copies based on include callback', () => {
    const target = { a: 7, b: 'foo bar', c: { b: 'hey' } }
    const { clone, skipped } = selectiveCopy(target, { include: (target, path, key, dataType) => ['object', 'string'].includes(dataType) })
    expect(clone).toEqual({ b: 'foo bar', c: { b: 'hey' } })
    expect(skipped).toEqual([{ target: 7, path: ['a'], key: 'a', dataType: 'number' }])
  })

  it('selectively copies based on exclude callback', () => {
    const target = ['lorem', 'ipsum', 'suet', 'corvi']
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { clone, skipped } = selectiveCopy(target, { exclude: (target, path, key, dataType) => +key > 1 })
    expect(clone).toEqual(['lorem', 'ipsum'])
    expect(skipped).toEqual([
      { target: 'suet', path: ['2'], key: '2', dataType: 'string' },
      { target: 'corvi', path: ['3'], key: '3', dataType: 'string' }
    ])
  })

  it('supports custom classes', () => {
    registerIterableClass<Map<unknown, unknown>>(
      Map,
      map => Array.from(map.keys()) as string[],
      (map, key) => map.get(key),
      (map, value, key) => map.set(key, value)
    )
    const target = { collection: new Map().set('blue', '#0000FF') }
    expect(selectiveCopy(target).clone).toEqual({ collection: new Map().set('blue', '#0000FF') })
    deregisterIterableClass(Map)
  })
})

describe('selectiveCopy - with config detectCircularReferences:true', () => {
  beforeEach(() => setConfig({ detectCircularReferences: true }))

  afterEach(() => setConfig({ detectCircularReferences: false }))

  it('clones primitive type data', () => {
    const symbol = Symbol()
    expect(selectiveCopy(symbol).clone).toEqual(symbol)
    expect(selectiveCopy('open sesame').clone).toEqual('open sesame')
    expect(selectiveCopy(5).clone).toEqual(5)
    expect(selectiveCopy(NaN).clone).toEqual(NaN)
    expect(selectiveCopy(true).clone).toEqual(true)
    expect(selectiveCopy(BigInt(9007199254740991)).clone).toEqual(BigInt(9007199254740991))
    expect(selectiveCopy(void 0).clone).toBeUndefined()
    expect(selectiveCopy(null).clone).toBeNull()
    const fn = () => {}
    expect(selectiveCopy(fn).clone).toEqual(fn)
  })

  it('throw error when second argument is not an object', () => {
    // @ts-expect-error Testing invalid input
    expect(() => selectiveCopy(5, null)).toThrow('Invalid options argument.')

    // @ts-expect-error Testing invalid input
    expect(() => selectiveCopy(5, [])).toThrowError('Invalid options argument.')
  })

  it('does not allow more than one behaviour to be specified', () => {
    expect(() => selectiveCopy(42, { includeKeys: [], exclude: () => true })).toThrowError(
      'Options includeKeys and exclude are mutually exclusive.'
    )
  })

  it('should copy function references by default', () => {
    const target = { method: () => true }
    const { clone, skipped } = selectiveCopy(target)
    expect(clone.method).toBe(target.method)
    expect(skipped).toEqual([])
  })

  it('should skip copying functions when flagged', () => {
    const target = { method: () => true }
    const { clone, skipped } = selectiveCopy(target, { skipFunctions: true })
    expect(clone).toEqual({})
    expect(skipped).toEqual([{ target: target.method, path: ['method'], key: 'method', dataType: 'function' }])
  })

  it('copies top-level keys that have been specified', () => {
    const target = { a: 5, b: 'hello world', c: [0] }
    const { clone, skipped } = selectiveCopy(target, { includeKeys: ['b', 'c'] })
    expect(clone).toEqual({ b: 'hello world', c: [0] })
    expect(skipped).toEqual([{ target: 5, path: ['a'], key: 'a', dataType: 'number' }])
  })

  it('does not copy top-level keys that have been specified', () => {
    const target = { a: 7, b: 'foo bar', c: { b: 'hey' } }
    const { clone, skipped } = selectiveCopy(target, { excludeKeys: ['b'] })
    expect(clone).toEqual({ a: 7, c: { b: 'hey' } })
    expect(skipped).toEqual([{ target: 'foo bar', path: ['b'], key: 'b', dataType: 'string' }])
  })

  it('selectively copies based on include callback', () => {
    const target = { a: 7, b: 'foo bar', c: { b: 'hey' } }
    const { clone, skipped } = selectiveCopy(target, { include: (target, path, key, dataType) => ['object', 'string'].includes(dataType) })
    expect(clone).toEqual({ b: 'foo bar', c: { b: 'hey' } })
    expect(skipped).toEqual([{ target: 7, path: ['a'], key: 'a', dataType: 'number' }])
  })

  it('selectively copies based on exclude callback', () => {
    const target = ['lorem', 'ipsum', 'suet', 'corvi']
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { clone, skipped } = selectiveCopy(target, { exclude: (target, path, key, dataType) => +key > 1 })
    expect(clone).toEqual(['lorem', 'ipsum'])
    expect(skipped).toEqual([
      { target: 'suet', path: ['2'], key: '2', dataType: 'string' },
      { target: 'corvi', path: ['3'], key: '3', dataType: 'string' }
    ])
  })

  it('supports custom classes', () => {
    registerIterableClass<Map<unknown, unknown>>(
      Map,
      map => Array.from(map.keys()) as string[],
      (map, key) => map.get(key),
      (map, value, key) => map.set(key, value)
    )
    const target = { collection: new Map().set('blue', '#0000FF') }
    expect(selectiveCopy(target).clone).toEqual({ collection: new Map().set('blue', '#0000FF') })
    deregisterIterableClass(Map)
  })

  it('recreates circular references', () => {
    const [target, expected] = [{ a: { b: { c: {} } } }, { a: { b: { c: {} } } }]
    target.a.b.c = target.a.b
    expected.a.b.c = expected.a.b
    const { clone } = selectiveCopy(target)
    expect(isIdentical(clone, expected)).toEqual(true)
  })
})
