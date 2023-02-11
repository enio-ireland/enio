import { Token } from '../shared/model'

export const getRoot = (tokens: Token[]) => tokens.find(token => token.root) as Token
