import { isMarker } from './isMarker'

describe('isMarker', () => {
  it('returns true when text matches the expected format', () => {
    expect(isMarker('__$96184805415709618480541570')).toEqual(true)
  })

  it('returns false when text does matches the expected format', () => {
    expect(isMarker('_$96184805415709618480541570')).toEqual(false)
    expect(isMarker('__96184805415709618480541570')).toEqual(false)
    expect(isMarker('')).toEqual(false)
    // @ts-expect-error TS2345
    expect(isMarker(null)).toEqual(false)
  })
})
