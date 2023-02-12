import { isValidType } from './isValidType'

describe('isValidType', () => {
  it('returns true when data is the expected type', () => {
    expect(isValidType('hello world', 'string')).toEqual(true)
  })

  it('returns false when data is not the expected type', () => {
    // @ts-expect-error TS2345 - deliberately passing incorrect arguments
    expect(isValidType<number>('hello world', 'number')).toEqual(false)
  })
})
