import type { Token } from '../shared/model'
import { getLines } from '../getLines/getLines'
import { linesToTokens } from '../linesToTokens/linesToTokens'

export const parseSchema = (string: string): Token[] => {
  const lines = getLines(string)
  const tokens = linesToTokens(lines)
  return tokens
}
