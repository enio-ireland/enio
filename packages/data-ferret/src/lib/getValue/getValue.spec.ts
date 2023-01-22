import { getValue } from './getValue'

describe('getValue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let target: any
  beforeEach(() => (target = { a: { b: { c: ['foo', 'bar'] } } }))

  it('returns the value of the path', () => {
    expect(getValue(target, ['a'])).toEqual(target.a)
    expect(getValue(target, ['a', 'b'])).toEqual(target.a.b)
    expect(getValue(target, ['a', 'b', 'c'])).toEqual(target.a.b.c)
    expect(getValue(target, ['a', 'b', 'c', '1'])).toEqual(target.a.b.c[1])
  })

  it('returns same value when path is empty array or undefined', () => {
    // @ts-expect-error TS2345 - deliberately passing incorrect data types
    expect(getValue(target, [])).toEqual(target)
  })

  it('throws an error when path is not an array', () => {
    // @ts-expect-error TS2345 - deliberately passing incorrect data types
    expect(() => getValue(target)).toThrow('Expected path to be an array.')

    // @ts-expect-error TS2345 - deliberately passing incorrect data types
    expect(() => getValue(target, null)).toThrow('Expected path to be an array.')

    // @ts-expect-error TS2345 - deliberately passing incorrect data types
    expect(() => getValue(target, {})).toThrow('Expected path to be an array.')
  })

  it('throws an error when keys in path are not type string', () => {
    // @ts-expect-error TS2345 - deliberately passing incorrect data types
    expect(() => getValue(target, ['a', 'b', 'c', 2])).toThrowError('Expected path.3 to be a non-empty string.')

    // @ts-expect-error TS2345 - deliberately passing incorrect data types
    expect(() => getValue(target, ['a', 'b', null])).toThrowError('Expected path.2 to be a non-empty string.')
  })

  it('throws an error when the value of the path does not exist', () => {
    expect(() => getValue(target, ['a', 'b', 'c', 'does-not-exist', 'unreachable'])).toThrowError()
  })

  it('returns default value when path in value not found', () => {
    expect(getValue(target, ['a', 'does-not-exist'], { onMissingKey: true })).toEqual(true)
    expect(getValue(target, ['a', 'b', 'c', 'does-not-exist'], { onMissingKey: null })).toEqual(null)
    expect(getValue(target, ['a', 'b', 'does-not-exist', 'unreachable'], { onMissingKey: 5 })).toEqual(5)
    expect(getValue(target, ['a', 'b', 'c', 'does-not-exist', 'unreachable'], { onMissingKey: 5 })).toEqual(5)
  })

  it('returns default value when encountering an error other than missing key', () => {
    target = {
      get a() {
        throw new Error()
      }
    }
    expect(getValue(target, ['a'], { onError: false })).toEqual(false)
  })
})
