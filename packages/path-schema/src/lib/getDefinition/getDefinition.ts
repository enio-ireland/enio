import type { Token } from '../shared/model'
import { parseSchema } from '../parseSchema/parseSchema'
import { getRoot } from '../getRoot/getRoot'
import { getTokenChildren } from '../getTokenChildren/getTokenChildren'

const getKeysName = (token: Token): string => `${titleCase(!token.root ? token.key : 'Root')}Keys`

const getScopeName = (token: Token): string => `${!token.root ? titleCase(token.key) + 'Scope' : 'DB'}`

const getTokenScopes = (token: Token, tokens: Token[]): string => {
  if (!token.children.length) return 'Reference'
  return `${getTokenChildren(token, tokens)
    .map(child => getScopeName(child))
    .join(' & ')}`
}

const titleCase = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

const createPathTypes = (token: Token, tokens: Token[], types: Set<string>): Set<string> => {
  const typeName = getKeysName(token)
  const children = getTokenChildren(token, tokens)
  children.length && types.add(`type ${typeName} = ${children.map(({ key }) => `'${key}'`).join(' | ')}`)
  children.forEach(child => createPathTypes(child, tokens, types))
  return types
}

const createDefinition = (token: Token, tokens: Token[]): string => {
  const children = getTokenChildren(token, tokens)
  const previousEntries = children.length ? children.reduce((string, child) => createDefinition(child, tokens) + string, '') : ''
  const typeName = getScopeName(token)
  const keyNames = getKeysName(token)
  const scopes = getTokenScopes(token, tokens)
  const entry = `\n\ntype ${typeName} = Reference & {\n  [key in ${keyNames}]: ${scopes}\n}`
  return `${previousEntries}${entry}`
}

export const getDefinition = (input: string): string => {
  const importStatement = "import type { Reference } from '@enio.ai/path-schema';"
  const tokens = parseSchema(input)
  const root = getRoot(tokens)
  const pathTypes = Array.from(createPathTypes(root, tokens, new Set<string>()).values()).join('\n')
  const definitions = createDefinition(root, tokens)
  return [importStatement, '\n\n', pathTypes, definitions].join('')
}
