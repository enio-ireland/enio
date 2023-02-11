import { parseSchema } from './parseSchema'

describe('parseSchema', () => {
  it('returns an empty array when it receives a blank string', () => {
    expect(parseSchema('')).toEqual([])
  })

  it('returns an empty array when it receives a blank multine string', () => {
    expect(
      parseSchema(`

    `)
    ).toEqual([])
  })

  it('returns a root node leading nowhere when additional details are not provided', () => {
    expect(parseSchema('@root')).toEqual([{ children: [], key: void 0, name: void 0, path: void 0, root: true }])
    expect(parseSchema('@root » ')).toEqual([{ children: [], key: void 0, name: void 0, path: void 0, root: true }])
  })

  it('returns a root node indicating it has a child node', () => {
    expect(parseSchema('@root » #nextStep')).toEqual([{ children: ['nextStep'], key: void 0, name: void 0, path: void 0, root: true }])
  })

  it('returns all listed nodes and their relationship to each other and makes no difference the order in which they are declared', () => {
    const rootToken = { children: ['nextStep'], key: void 0, name: void 0, path: void 0, root: true }
    const nextStep = { children: ['deeperStep'], key: 'nextStep', name: 'nextStep', path: 'nextStep', root: false }
    const deeperStep = { children: [], key: 'deeperStep', name: 'deeperStep', path: 'deeperStep', root: false }
    let tokens = parseSchema(`
      @root » #nextStep
      #nextStep » #deeperStep
      #deeperStep
    `)
    expect(tokens).toEqual([
      { children: ['nextStep'], key: undefined, name: undefined, path: undefined, root: true },
      { children: ['deeperStep'], key: 'nextStep', name: 'nextStep', path: 'nextStep', root: false },
      { children: [], key: 'deeperStep', name: 'deeperStep', path: 'deeperStep', root: false }
    ])

    tokens = parseSchema(`
      #nextStep » #deeperStep
      #deeperStep
      @root » #nextStep
    `)
    expect(tokens).toEqual([
      { children: ['deeperStep'], key: 'nextStep', name: 'nextStep', path: 'nextStep', root: false },
      { children: [], key: 'deeperStep', name: 'deeperStep', path: 'deeperStep', root: false },
      { children: ['nextStep'], key: undefined, name: undefined, path: undefined, root: true }
    ])

    tokens = parseSchema(`
      #nextStep » #deeperStep
      @root » #nextStep
      #deeperStep
    `)
    expect(tokens).toEqual([
      { children: ['deeperStep'], key: 'nextStep', name: 'nextStep', path: 'nextStep', root: false },
      { children: ['nextStep'], key: undefined, name: undefined, path: undefined, root: true },
      { children: [], key: 'deeperStep', name: 'deeperStep', path: 'deeperStep', root: false }
    ])
  })
})
