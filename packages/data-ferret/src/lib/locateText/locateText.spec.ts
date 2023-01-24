import { locateText } from './locateText'
import { setConfig } from '../shared/consts'

describe('locateText', () => {
  let target: unknown

  beforeEach(() => {
    target = {
      books: [{ name: 'Cherry Contact' }, { name: 'Dark Veil' }, { name: 'The Crown in the Vale' }, { name: 'The Amber Noose' }],
      favorites: ['Song of a Maid', 'Dynamite Touch', 'The Yellow Curtain', 'Tapped for Mercy']
    }
  })

  it('throws an error for incorrect pattern types', () => {
    // @ts-expect-error TS-2554 - deliberately passing incorrect data types
    expect(() => locateText(target, null)).toThrowError('Expected pattern to be either a string of a regular expression.')
  })

  it('returns locations where text matches exactly', () => {
    expect(locateText(target, 't')).toEqual([])
    expect(locateText(target, 'The')).toEqual([])
    expect(locateText(target, 'The Yellow Curtain')).toEqual([['favorites', '2']])
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(locateText(target, 't*')).toEqual([])
  })

  it('returns locations where text matches a pattern', () => {
    expect(locateText(target, /^the/i)).toEqual([
      ['books', '2', 'name'],
      ['books', '3', 'name'],
      ['favorites', '2']
    ])
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(locateText(target, 't.*')).toEqual([])
  })
})

describe('locateText - with config detectCircularReferences:true', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let target: any

  beforeEach(() => setConfig({ detectCircularReferences: true }))

  afterEach(() => setConfig({ detectCircularReferences: false }))

  beforeEach(() => {
    target = {
      books: [{ name: 'Cherry Contact' }, { name: 'Dark Veil' }, { name: 'The Crown in the Vale' }, { name: 'The Amber Noose' }],
      favorites: ['Song of a Maid', 'Dynamite Touch', 'The Yellow Curtain', 'Tapped for Mercy']
    }
    target.books[1].name = target
    target.favorites[3] = target.favorites
  })

  it('returns locations where text matches exactly', () => {
    expect(locateText(target, 't')).toEqual([])
    expect(locateText(target, 'The')).toEqual([])
    expect(locateText(target, 'The Yellow Curtain')).toEqual([['favorites', '2']])
  })

  it('does not support glob patterns, it uses native regular expressions instead', () => {
    expect(locateText(target, 't*')).toEqual([])
  })

  it('returns locations where text matches a pattern', () => {
    expect(locateText(target, /^the/i)).toEqual([
      ['books', '2', 'name'],
      ['books', '3', 'name'],
      ['favorites', '2']
    ])
  })

  it('does not support regular expression string, it uses native regular expressions instead', () => {
    expect(locateText(target, 't.*')).toEqual([])
  })
})
