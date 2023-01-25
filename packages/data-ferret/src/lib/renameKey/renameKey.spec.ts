/* eslint-disable @typescript-eslint/no-explicit-any */
import { renameKey } from './renameKey'
import { setConfig } from '../shared/consts'

describe('renameKey', () => {
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
    expect(() => renameKey(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('throws an error for incorrect name types', () => {
    // @ts-expect-error TS-2345 - deliberately passing incorrect data types
    expect(() => renameKey(target, '', null)).toThrowError('Expected name to be a string.')
  })

  it('returns locations where key name matches exactly', () => {
    prepareTarget()
    expect(renameKey(target, 'ip', 'ip2')).toEqual([])

    prepareTarget()
    expect(renameKey(target, '166.211.210.117', 'xxx.xxx.xxx.xxx')).toEqual([])

    prepareTarget()
    expect(renameKey(target, 'ip_address', 'ipAddress')).toEqual([
      ['0', 'ipAddress'],
      ['1', 'ipAddress']
    ])
    expect('ipAddress' in target[0]).toBe(true)
    expect('ip_address' in target[0]).toBe(false)
    expect('ipAddress' in target[1]).toBe(true)
    expect('ip_address' in target[1]).toBe(false)
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(renameKey(target, 'ip*', 'ip2')).toEqual([])
  })

  it('returns locations where key name matches a pattern', () => {
    expect(renameKey(target, /_name/i, 'Name')).toEqual([
      ['0', 'firstName'],
      ['0', 'lastName'],
      ['1', 'firstName'],
      ['1', 'lastName']
    ])
    expect('firstName' in target[0]).toBe(true)
    expect('firstName' in target[1]).toBe(true)
    expect('lastName' in target[0]).toBe(true)
    expect('lastName' in target[1]).toBe(true)
    expect('first_name' in target[0]).toBe(false)
    expect('first_name' in target[1]).toBe(false)
    expect('last_name' in target[0]).toBe(false)
    expect('last_name' in target[1]).toBe(false)
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(renameKey(target, 'ip.*', 'ip2')).toEqual([])
  })
})

describe('renameKey - with config detectCircularReferences:true', () => {
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
    expect(() => renameKey(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('throws an error for incorrect name types', () => {
    // @ts-expect-error TS-2345 - deliberately passing incorrect data types
    expect(() => renameKey(target, '', null)).toThrowError('Expected name to be a string.')
  })

  it('returns locations where key name matches exactly', () => {
    prepareTarget()
    expect(renameKey(target, 'ip', 'ip2')).toEqual([])

    prepareTarget()
    expect(renameKey(target, '166.211.210.117', 'xxx.xxx.xxx.xxx')).toEqual([])

    prepareTarget()
    expect(renameKey(target, 'ip_address', 'ipAddress')).toEqual([
      ['0', 'ipAddress'],
      ['1', 'ipAddress']
    ])
    expect('ipAddress' in target[0]).toBe(true)
    expect('ip_address' in target[0]).toBe(false)
    expect('ipAddress' in target[1]).toBe(true)
    expect('ip_address' in target[1]).toBe(false)
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(renameKey(target, 'ip*', 'ip2')).toEqual([])
  })

  it('returns locations where key name matches a pattern', () => {
    expect(renameKey(target, /_name/i, 'Name')).toEqual([
      ['0', 'firstName'],
      ['0', 'lastName'],
      ['1', 'firstName'],
      ['1', 'lastName']
    ])
    expect('firstName' in target[0]).toBe(true)
    expect('firstName' in target[1]).toBe(true)
    expect('lastName' in target[0]).toBe(true)
    expect('lastName' in target[1]).toBe(true)
    expect('first_name' in target[0]).toBe(false)
    expect('first_name' in target[1]).toBe(false)
    expect('last_name' in target[0]).toBe(false)
    expect('last_name' in target[1]).toBe(false)
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(renameKey(target, 'ip.*', 'ip2')).toEqual([])
  })
})
