import { getPaths } from './getPaths'

describe('getPaths', () => {
  it('throws error when schema is empty, not defined, or incorrect type', () => {
    // @ts-expect-error TS2345 - deliberately passing incorrect arguments
    expect(() => getPaths(45)).toThrowError('Expected schema to be a string.')
    expect(() => getPaths('')).toThrowError('Expected schema to be defined.')
    expect(() => getPaths('  ')).toThrowError('Expected schema not to be an empty string.')
    expect(() =>
      getPaths(`

    `)
    ).toThrowError('Expected schema not to be an empty string.')
  })

  it('throws error when schema contains no mention of root', () => {
    expect(() => getPaths('#a')).toThrowError('Expected root to be declared.')
  })

  it('throws error when schema contains more than one mention of root', () => {
    expect(() => getPaths('@root @root')).toThrowError('Expected a single root declaration, found more than one.')
    expect(() => getPaths('@root @root »')).toThrowError('Expected a single root declaration, found more than one.')
    expect(() => getPaths('@root » @root')).toThrowError('Expected a single root declaration, found more than one.')
    expect(() =>
      getPaths(`
      @root » #a
      #a
      #b
      @root » #b
    `)
    ).toThrowError('Expected a single root declaration, found more than one.')
  })

  it('throws error for orphan # symbol', () => {
    expect(() => getPaths('#')).toThrowError(
      'Syntax Error: Encountered an orphan # symbol. # symbol is used to declare a path, and must be immediately followed by a word.'
    )
    expect(() => getPaths('# something')).toThrowError(
      'Syntax Error: Encountered an orphan # symbol. # symbol is used to declare a path, and must be immediately followed by a word.'
    )
  })

  it('throws error for orphan @ symbol', () => {
    expect(() => getPaths('@')).toThrowError(
      "Syntax Error: Encountered an orphan @ symbol. @ symbol can only be used like so '@root' to define the entry point to the schema."
    )
    expect(() => getPaths('@something')).toThrowError(
      "Syntax Error: Encountered an orphan @ symbol. @ symbol can only be used like so '@root' to define the entry point to the schema."
    )
  })

  it('throws error for empty text between square brackets', () => {
    expect(() => getPaths('[]')).toThrowError('Syntax Error: Encountered square brackets not enclosing a word.')
    expect(() => getPaths('[  ]')).toThrowError('Syntax Error: Encountered square brackets not enclosing a word.')
    expect(() =>
      getPaths(`[
    ]`)
    ).toThrowError('Syntax Error: Encountered square brackets not enclosing a word.')
  })

  it('throws error for orphan square brackets', () => {
    expect(() => getPaths('[')).toThrowError('Syntax Error: Found an orphan bracket symbol.')
    expect(() => getPaths(']')).toThrowError('Syntax Error: Found an orphan bracket symbol.')
  })

  it('throws error for consecutive forward slash symbols', () => {
    expect(() => getPaths('apple//tart')).toThrowError('Syntax Error: Consecutive forward slash symbols are not allowed.')
  })

  it('throws error for forward slash symbol not surrounded by', () => {
    expect(() => getPaths('@root apple/')).toThrowError('Syntax Error: Expected forward slash symbol is only allowed between words.')
    expect(() => getPaths('@root /tart')).toThrowError('Syntax Error: Expected forward slash symbol is only allowed between words.')
  })

  it('not to throw when minimum details provided', () => {
    /** Not much of a test actually. All scenarios have been covered in unit tests elsewhere. */
    expect(() =>
      getPaths(`
      @root » #a
      #a
    `)
    ).not.toThrow()
  })
})
