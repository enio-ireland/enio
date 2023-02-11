import type { Token } from '../shared/model'

export const getTokenByName = (name: string, tokens: Token[]) => {
  const token = tokens.find(token => token.name === name) as Token
  if (!token) throw new Error(`Could not find a token named '${name}'.`)
  return token
}
