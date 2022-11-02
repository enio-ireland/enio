import { getConfig, setConfig } from './consts'

describe('getConfig / setConfig', () => {
  it('can toggle whether or not order of properties matter for equality checks', () => {
    setConfig({ samePositionOfOwnProperties: true })
    expect(getConfig().samePositionOfOwnProperties).toEqual(true)

    setConfig({ samePositionOfOwnProperties: false })
    expect(getConfig().samePositionOfOwnProperties).toEqual(false)
  })
})
