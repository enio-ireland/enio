import type { Token } from '../shared/model'
import { getRoot } from './getRoot'

describe('getRoot', () => {
  it('returns a single token that is the root', () => {
    const tokens = [
      { name: 'z', children: ['a', 'b'] },
      { name: 'a', children: ['c'] },
      { name: 'y', children: [], root: true },
      { name: 'b', children: [] }
    ] as unknown as Token[]
    expect(getRoot(tokens)).toEqual(tokens[2])
  })
})
