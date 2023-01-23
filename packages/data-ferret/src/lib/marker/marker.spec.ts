import { marker } from './marker'
import { isMarker } from '../isMarker/isMarker'

describe('marker', () => {
  it('creates unique names that cannot be repeated', () => {
    const names = new Array(10).fill(0).map(() => marker())
    expect(names.length).toEqual(new Set(names).size)
  })

  it('produces a name in the expected format', () => {
    expect(isMarker(marker())).toEqual(true)
  })
})
