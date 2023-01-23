import { getDepth } from './getDepth'
import { setConfig } from '../shared/consts'

describe('getDepth', () => {
  let target: unknown

  it('return the max depth of the data structure of a value', () => {
    target = {
      a: { b: { c: 42 } },
      b: 80,
      z: [100, 200, 500, [[]]]
    }
    const [maxDepth, locations] = getDepth(target)
    expect(maxDepth).toEqual(3)
    expect(locations).toEqual([
      ['a', 'b', 'c'],
      ['z', '3', '0']
    ])
  })
})

describe('getDepth - with config detectCircularReferences:true', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let target: any

  beforeEach(() => setConfig({ detectCircularReferences: true }))

  afterEach(() => setConfig({ detectCircularReferences: false }))

  it('return the max depth of the data structure of a value', () => {
    target = {
      a: { b: { c: 42 } },
      b: 80,
      z: [100, 200, 500, [[]]]
    }
    target.b = target
    target.z[3][0][0] = target.z[3]
    const [maxDepth, locations] = getDepth(target)
    expect(maxDepth).toEqual(3)
    expect(locations).toEqual([
      ['a', 'b', 'c'],
      ['z', '3', '0']
    ])
  })
})
