import { linesToTokens } from './linesToTokens'

describe('linesToTokens', () => {
  it('it will never get empty lines, if it did, it would throw an error', () => {
    expect(() => linesToTokens([''])).toThrowError('Cannot identify name.')
  })

  it('returns a root node leading nowhere when additional details are not provided', () => {
    expect(linesToTokens(['@root'])).toEqual([{ children: [], key: void 0, name: void 0, path: void 0, root: true }])
    expect(linesToTokens(['@root » '])).toEqual([{ children: [], key: void 0, name: void 0, path: void 0, root: true }])
  })

  it('returns a root node indicating it has a child node', () => {
    expect(linesToTokens(['@root » #nextStep'])).toEqual([{ children: ['nextStep'], key: void 0, name: void 0, path: void 0, root: true }])
  })

  it('returns all listed nodes and their relationship to each other', () => {
    const tokens = linesToTokens(['@root » #nextStep', '#nextStep » #deeperStep', '#deeperStep'])
    expect(tokens.length).toEqual(3)
  })
})
