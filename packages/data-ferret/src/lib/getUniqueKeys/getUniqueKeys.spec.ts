import { getUniqueKeys } from './getUniqueKeys'
import { setConfig } from '../shared/consts'

describe('getUniqueKeys', () => {
  let target: unknown

  beforeEach(() => {
    target = {
      'hello-world': false,
      b: {
        helicopter: 42
      },
      HELICOPTER: 2,
      c: ['helix', 'hell'],
      helium: { helicopter: 47 },
      verthel: 2022
    }
  })

  it('throws an error for incorrect pattern types', () => {
    // @ts-expect-error TS-2554 - deliberately passing incorrect data types
    expect(() => getUniqueKeys(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('returns all the uniques keys when no specific pattern or value specified', () => {
    expect(getUniqueKeys(target)).toEqual(['hello-world', 'b', 'HELICOPTER', 'c', 'helium', 'verthel', 'helicopter', '0', '1'])
  })

  it('returns all the uniques keys that match the name exactly', () => {
    expect(getUniqueKeys(target, 'h', { depth: [0, '*'] })).toEqual([])
    expect(getUniqueKeys(target, 'h*', { depth: [0, '*'] })).toEqual([])
    expect(getUniqueKeys(target, 'helix', { depth: [0, '*'] })).toEqual([])
    expect(getUniqueKeys(target, 'helicopter', { depth: [0, '*'] })).toEqual(['helicopter'])
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(getUniqueKeys(target, 'h*', { depth: [0, '*'] })).toEqual([])
  })

  it('returns all the uniques keys that match the pattern', () => {
    expect(getUniqueKeys(target, /^hel/i, { depth: [0, '*'] })).toEqual(['hello-world', 'HELICOPTER', 'helium', 'helicopter'])
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(getUniqueKeys(target, 'h.*', { depth: [0, '*'] })).toEqual([])
  })
})

describe('getUniqueKeys - with config detectCircularReferences:true', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let target: any

  beforeEach(() => setConfig({ detectCircularReferences: true }))

  afterEach(() => setConfig({ detectCircularReferences: false }))

  beforeEach(() => {
    target = {
      'hello-world': false,
      b: {
        helicopter: 42
      },
      HELICOPTER: 2,
      c: ['helix', 'hell'],
      helium: { helicopter: 47 },
      verthel: 2022
    }
    target.HELICOPTER = target
    target.b.helicopter = target.verthel
  })

  it('returns all the uniques keys when no specific pattern or value specified', () => {
    expect(getUniqueKeys(target)).toEqual(['hello-world', 'b', 'HELICOPTER', 'c', 'helium', 'verthel', 'helicopter', '0', '1'])
  })

  it('returns all the uniques keys that match the name exactly', () => {
    expect(getUniqueKeys(target, 'h', { depth: [0, '*'] })).toEqual([])
    expect(getUniqueKeys(target, 'h*', { depth: [0, '*'] })).toEqual([])
    expect(getUniqueKeys(target, 'helix', { depth: [0, '*'] })).toEqual([])
    expect(getUniqueKeys(target, 'helicopter', { depth: [0, '*'] })).toEqual(['helicopter'])
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(getUniqueKeys(target, 'h*', { depth: [0, '*'] })).toEqual([])
  })

  it('returns all the uniques keys that match the pattern', () => {
    expect(getUniqueKeys(target, /^hel/i, { depth: [0, '*'] })).toEqual(['hello-world', 'HELICOPTER', 'helium', 'helicopter'])
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(getUniqueKeys(target, 'h.*', { depth: [0, '*'] })).toEqual([])
  })
})
