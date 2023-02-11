import { replaceKeys } from './replaceKeys'

describe('replaceKeys', () => {
  it('throws an error when replacements is not an object', () => {
    // @ts-expect-error TS2345 - deliberately passing incorrect arguments
    expect(() => replaceKeys('', [])).toThrowError(
      'Expected replacements to an dictinary, where keys are value to replace, and value is the value to replace with.'
    )

    // @ts-expect-error TS2345 - deliberately passing incorrect arguments
    expect(() => replaceKeys('', 45)).toThrowError(
      'Expected replacements to an dictinary, where keys are value to replace, and value is the value to replace with.'
    )

    // @ts-expect-error TS2345 - deliberately passing incorrect arguments
    expect(() => replaceKeys('', null)).toThrowError(
      'Expected replacements to an dictinary, where keys are value to replace, and value is the value to replace with.'
    )
  })

  it('replaces any values within square brackets using the given dictionary', () => {
    expect(replaceKeys('project/[projectName]/etc', { projectName: 'alpha' })).toEqual('project/alpha/etc')
  })

  it('throws an error when notices no all dynamic value tokens were replaced', () => {
    expect(() => replaceKeys('project/[projectName]/etc', {})).toThrowError(
      "Some dynamic values have not been replaced. See 'projectName'."
    )
  })
})
