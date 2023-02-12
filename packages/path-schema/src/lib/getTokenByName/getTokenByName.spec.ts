import type { Token } from '../shared/model'
import { getTokenByName } from './getTokenByName'

describe('getTokenByName', () => {
  let tokens: Token[]

  beforeEach(() => {
    tokens = [
      { name: 'z', children: ['a', 'b'] },
      { name: 'a', children: ['c'] },
      { name: 'y', children: [] },
      { name: 'b', children: [] }
    ] as Token[]
  })

  it('returns a single token that matches the name', () => {
    expect(getTokenByName('a', tokens)).toEqual(tokens[1])
    expect(getTokenByName('b', tokens)).toEqual(tokens[3])
  })

  it('throws an error when token not found', () => {
    expect(() => getTokenByName('c', tokens)).toThrowError("Could not find a token named 'c'.")
  })
})
