import { getConfig, setConfig } from './consts'

describe('getConfig / setConfig', () => {
  it('can toggle whether or not order of properties matter for equality checks', () => {
    setConfig({ samePositionOfOwnProperties: true })
    expect(getConfig().samePositionOfOwnProperties).toEqual(true)

    setConfig({ samePositionOfOwnProperties: false })
    expect(getConfig().samePositionOfOwnProperties).toEqual(false)
  })

  it('can toggle whether or not will detect circular references', () => {
    setConfig({ detectCircularReferences: true })
    expect(getConfig().detectCircularReferences).toEqual(true)

    setConfig({ detectCircularReferences: false })
    expect(getConfig().detectCircularReferences).toEqual(false)
  })

  it('should not change flag that have not be explicitly set', () => {
    const originalConfig = { ...getConfig() }
    setConfig({})
    expect(getConfig()).toEqual(originalConfig)
  })
})
