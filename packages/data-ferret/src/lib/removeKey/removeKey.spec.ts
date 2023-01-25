/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeKey } from './removeKey'
import { setConfig } from '../shared/consts'

describe('removeKey', () => {
  let target: any

  const prepareTarget = (): void => {
    target = [
      {
        id: 1,
        first_name: 'Anabal',
        last_name: 'Armer',
        email: 'aarmer0@wired.com',
        gender: 'Bigender',
        ip_address: '166.211.210.117'
      },
      {
        id: 2,
        first_name: 'Blair',
        last_name: 'Tithecote',
        email: 'btithecote1@huffingtonpost.com',
        gender: 'Male',
        ip_address: '121.144.216.170'
      }
    ]
  }

  beforeEach(() => prepareTarget())

  it('throws an error for incorrect pattern types', () => {
    // @ts-expect-error TS-2554 - deliberately passing incorrect data types
    expect(() => removeKey(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('returns locations where key name matches exactly', () => {
    prepareTarget()
    expect(removeKey(target, 'ip')).toEqual([])

    prepareTarget()
    expect(removeKey(target, '166.211.210.117')).toEqual([])

    prepareTarget()
    expect(removeKey(target, 'ip_address')).toEqual([
      ['0', 'ip_address'],
      ['1', 'ip_address']
    ])
    expect('ip_address' in target[0]).toBe(false)
    expect('ip_address' in target[1]).toBe(false)
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(removeKey(target, 'ip*')).toEqual([])
  })

  it('returns locations where key name matches a pattern', () => {
    expect(removeKey(target, /_name|0/i)).toEqual([['0'], ['0', 'first_name'], ['0', 'last_name']])
    expect('first_name' in target[0]).toBe(false)
    expect('last_name' in target[0]).toBe(false)
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(removeKey(target, 'ip.*')).toEqual([])
  })
})

describe('removeKey - with config detectCircularReferences:true', () => {
  let target: any

  const prepareTarget = (): void => {
    target = [
      {
        id: 1,
        first_name: 'Anabal',
        last_name: 'Armer',
        email: 'aarmer0@wired.com',
        gender: 'Bigender',
        ip_address: '166.211.210.117'
      },
      {
        id: 2,
        first_name: 'Blair',
        last_name: 'Tithecote',
        email: 'btithecote1@huffingtonpost.com',
        gender: 'Male',
        ip_address: '121.144.216.170'
      }
    ]
    target[0].gender = target[1].email
    target[1].gender = target[0].email
  }

  beforeEach(() => {
    setConfig({ detectCircularReferences: true })
    prepareTarget()
  })

  afterEach(() => setConfig({ detectCircularReferences: false }))

  it('throws an error for incorrect pattern types', () => {
    // @ts-expect-error TS-2554 - deliberately passing incorrect data types
    expect(() => removeKey(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('returns locations where key name matches exactly', () => {
    prepareTarget()
    expect(removeKey(target, 'ip')).toEqual([])

    prepareTarget()
    expect(removeKey(target, '166.211.210.117')).toEqual([])

    prepareTarget()
    expect(removeKey(target, 'ip_address')).toEqual([
      ['0', 'ip_address'],
      ['1', 'ip_address']
    ])
    expect('ip_address' in target[0]).toBe(false)
    expect('ip_address' in target[1]).toBe(false)
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(removeKey(target, 'ip*')).toEqual([])
  })

  it('returns locations where key name matches a pattern', () => {
    expect(removeKey(target, /_name|0/i)).toEqual([['0'], ['0', 'first_name'], ['0', 'last_name']])
    expect('first_name' in target[0]).toBe(false)
    expect('last_name' in target[0]).toBe(false)
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(removeKey(target, 'ip.*')).toEqual([])
  })
})
