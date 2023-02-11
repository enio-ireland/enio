import type { Token } from '../shared/model'
import { getTokenByName } from '../getTokenByName/getTokenByName'

export const getTokenChildren = (token: Token, tokens: Token[]): Token[] => token.children.map(name => getTokenByName(name, tokens))
