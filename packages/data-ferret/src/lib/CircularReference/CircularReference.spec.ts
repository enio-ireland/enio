import { CircularReference } from '../CircularReference'

describe('CircularReference', () => {
  let circularRef: CircularReference

  beforeEach(() => circularRef =  new CircularReference(['a', 'b', 'c', 'd'],['a', 'b']))

  it('creates an instance', () => {
    expect(circularRef instanceof CircularReference).toEqual(true)
  })

  it('throws an error when incorrect values are given', () => {
    // @ts-expect-error TS2345 - deliberately passing incorrect data types
    expect(() => new CircularReference(['keyA'], null)).toThrowError('Expected target to be a list with at least on string value.')
    expect(() => new CircularReference(['keyA'], [])).toThrowError('Expected target to be a list with at least on string value.')
    // @ts-expect-error TS2345 - deliberately passing incorrect data types
    expect(() => new CircularReference(null, ['keyB'])).toThrowError('Expected location to be a list with at least on string value.')
    expect(() => new CircularReference([], ['keyB'])).toThrowError('Expected location to be a list with at least on string value.')
  })

  describe('depth', () => {
    it('returns the distance between the location and reference target', () => {
      expect(circularRef.depth).toEqual(2)
    })
  })

  describe('toString', () => {
    it('returs a string representation', () => {
      expect(circularRef.toString()).toEqual('a\u00B7b\u00B7c\u00B7d → a\u00B7b')
    })
  })

  describe('toJSON', () => {
    it('returs a string representation', () => {
      expect(circularRef.toJSON()).toEqual('a\u00B7b\u00B7c\u00B7d → a\u00B7b')
    })
  })
})
