import { locateKey } from './locateKey'
import { setConfig } from '../shared/consts'

describe('locateKey', () => {
  let target: unknown

  beforeEach(() => {
    target = {
      'hello-world': false,
      b: {
        helicopter: 42
      },
      HELICOPTER: 2,
      c: ['helix', 'hell'],
      helium: {},
      verthel: 2022
    }
  })

  it('throws an error for incorrect pattern types', () => {
    // @ts-expect-error TS-2554 - deliberately passing incorrect data types
    expect(() => locateKey(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('returns locations where key name matches exactly', () => {
    expect(locateKey(target, 'h', { depth: [0, '*'] })).toEqual([])
    expect(locateKey(target, 'h*', { depth: [0, '*'] })).toEqual([])
    expect(locateKey(target, 'helix', { depth: [0, '*'] })).toEqual([])
    expect(locateKey(target, 'helicopter', { depth: [0, '*'] })).toEqual([['b', 'helicopter']])
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(locateKey(target, 'h*', { depth: [0, '*'] })).toEqual([])
  })

  it('returns locations where key name matches a pattern', () => {
    expect(locateKey(target, /^hel/i, { depth: [0, '*'] })).toEqual([['hello-world'], ['HELICOPTER'], ['helium'], ['b', 'helicopter']])
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(locateKey(target, 'h.*', { depth: [0, '*'] })).toEqual([])
  })
})

describe('locateKey - with config detectCircularReferences:true', () => {
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
      helium: {},
      verthel: 2022
    }
    target.HELICOPTER = target
    target.b.helicopter = target.verthel
  })

  it('returns locations where key name matches exactly', () => {
    expect(locateKey(target, 'h', { depth: [0, '*'] })).toEqual([])
    expect(locateKey(target, 'h*', { depth: [0, '*'] })).toEqual([])
    expect(locateKey(target, 'helix', { depth: [0, '*'] })).toEqual([])
    expect(locateKey(target, 'helicopter', { depth: [0, '*'] })).toEqual([['b', 'helicopter']])
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(locateKey(target, 'h*', { depth: [0, '*'] })).toEqual([])
  })

  it('returns locations where key name matches a pattern', () => {
    expect(locateKey(target, /^hel/i, { depth: [0, '*'] })).toEqual([['hello-world'], ['HELICOPTER'], ['helium'], ['b', 'helicopter']])
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(locateKey(target, 'h.*', { depth: [0, '*'] })).toEqual([])
  })
})
