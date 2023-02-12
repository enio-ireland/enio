import type { Token } from '../shared/model'
import { getTokenChildren } from './getTokenChildren'

describe('getTokenChildren', () => {
  it('returns a list of tokens contained in another', () => {
    const tokens = [
      { name: 'z', children: ['a', 'b'] },
      { name: 'a', children: ['c'] },
      { name: 'y', children: [] },
      { name: 'b', children: [] }
    ] as Token[]
    const children = getTokenChildren(tokens[0], tokens)
    expect(children).toContain(tokens[1])
    expect(children).toContain(tokens[3])
  })
})
