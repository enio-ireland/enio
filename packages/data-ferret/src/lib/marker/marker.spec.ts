import { marker } from './marker'
import { isMarker } from '../isMarker/isMarker'

describe('marker', () => {
  it('should create unique names that cannot be repeated', () => {
    const names = new Array(10).fill(0).map(() => marker())
    expect(names.length).toEqual(new Set(names).size)
  })

  it('should produce a name in the expected format', () => {
    expect(isMarker(marker())).toEqual(true)
  })
})
