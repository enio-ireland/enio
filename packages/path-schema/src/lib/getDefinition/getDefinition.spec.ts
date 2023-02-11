import { getDefinition } from './getDefinition'

describe('getDefinition', () => {
  it('should return the correct Typescript definitions', () => {
    const input = `
      @root » #opensource #enterprise
      #opensource 'openSource' opensource » #projects
      #enterprise 'enterprise' enterprise » #projects
      #projects 'project' projects/[name] » #badges
      #badges 'badge' [reporting/badges] » #coverageBadge #buildBadge
      #coverageBadge 'coverage'
      #buildBadge 'build'
    `

    const output = getDefinition(input)

    const expected = [
      "import type { Reference } from '@enio.ai/path-schema';",
      '',
      "type RootKeys = 'openSource' | 'enterprise'",
      "type OpenSourceKeys = 'project'",
      "type ProjectKeys = 'badge'",
      "type BadgeKeys = 'coverage' | 'build'",
      "type EnterpriseKeys = 'project'",
      '',
      'type BuildScope = Reference & {',
      '  [key in BuildKeys]: Reference',
      '}',
      '',
      'type CoverageScope = Reference & {',
      '  [key in CoverageKeys]: Reference',
      '}',
      '',
      'type BadgeScope = Reference & {',
      '  [key in BadgeKeys]: CoverageScope & BuildScope',
      '}',
      '',
      'type ProjectScope = Reference & {',
      '  [key in ProjectKeys]: BadgeScope',
      '}',
      '',
      'type EnterpriseScope = Reference & {',
      '  [key in EnterpriseKeys]: ProjectScope',
      '}',
      '',
      'type BuildScope = Reference & {',
      '  [key in BuildKeys]: Reference',
      '}',
      '',
      'type CoverageScope = Reference & {',
      '  [key in CoverageKeys]: Reference',
      '}',
      '',
      'type BadgeScope = Reference & {',
      '  [key in BadgeKeys]: CoverageScope & BuildScope',
      '}',
      '',
      'type ProjectScope = Reference & {',
      '  [key in ProjectKeys]: BadgeScope',
      '}',
      '',
      'type OpenSourceScope = Reference & {',
      '  [key in OpenSourceKeys]: ProjectScope',
      '}',
      '',
      'type DB = Reference & {',
      '  [key in RootKeys]: OpenSourceScope & EnterpriseScope',
      '}'
    ]

    expect(output).toEqual(expected.join('\n'))
  })
})
