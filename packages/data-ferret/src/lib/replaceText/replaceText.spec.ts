/* eslint-disable @typescript-eslint/no-explicit-any */
import { replaceText } from './replaceText'
import { setConfig } from '../shared/consts'

describe('replaceText', () => {
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
    expect(() => replaceText(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('throws an error for incorrect name types', () => {
    // @ts-expect-error TS-2345 - deliberately passing incorrect data types
    expect(() => replaceText(target, '', null)).toThrowError('Expected name to be a string.')
  })

  it('returns locations where text matches exactly', () => {
    prepareTarget()
    expect(replaceText(target, 'does-not-exist', '')).toEqual([])

    prepareTarget()
    expect(replaceText(target, '121.144.216.170', 'xxx.xxx.xxx.xxx')).toEqual([['1', 'ip_address']])
    expect(target[1].ip_address).toEqual('xxx.xxx.xxx.xxx')
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(replaceText(target, 'ip*', 'ip2')).toEqual([])
  })

  it('returns locations where text matches a pattern', () => {
    expect(replaceText(target, /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\.[0-9]{3}/i, 'xxx.xxx.xxx.xxx')).toEqual([
      ['0', 'ip_address'],
      ['1', 'ip_address']
    ])
    expect(target[0].ip_address).toEqual('xxx.xxx.xxx.xxx')
    expect(target[1].ip_address).toEqual('xxx.xxx.xxx.xxx')
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(replaceText(target, '.*', '')).toEqual([])
  })
})

describe('replaceText - with config detectCircularReferences:true', () => {
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
    expect(() => replaceText(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('throws an error for incorrect name types', () => {
    // @ts-expect-error TS-2345 - deliberately passing incorrect data types
    expect(() => replaceText(target, '', null)).toThrowError('Expected name to be a string.')
  })

  it('returns locations where text matches exactly', () => {
    prepareTarget()
    expect(replaceText(target, 'does-not-exist', '')).toEqual([])

    prepareTarget()
    expect(replaceText(target, '121.144.216.170', 'xxx.xxx.xxx.xxx')).toEqual([['1', 'ip_address']])
    expect(target[1].ip_address).toEqual('xxx.xxx.xxx.xxx')
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(replaceText(target, 'ip*', 'ip2')).toEqual([])
  })

  it('returns locations where text matches a pattern', () => {
    expect(replaceText(target, /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\.[0-9]{3}/i, 'xxx.xxx.xxx.xxx')).toEqual([
      ['0', 'ip_address'],
      ['1', 'ip_address']
    ])
    expect(target[0].ip_address).toEqual('xxx.xxx.xxx.xxx')
    expect(target[1].ip_address).toEqual('xxx.xxx.xxx.xxx')
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(replaceText(target, '.*', '')).toEqual([])
  })
})
