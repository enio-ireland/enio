import { Token } from '../shared/model'

const getSides = (line: string): [string, string] => line.split(/»/g).map(side => side.trim()) as [string, string]

/* istanbul ignore next */
const pointers = (string: string): string[] => Array.from(string.matchAll(/(?<=#)[a-zA-Z]+/g)).map(r => r[0]) || ''

const isRoot = (string: string): boolean => /@root/.test(string)

const getName = (string: string): string => pointers(string)[0]

const getKey = (string: string): string => [...(Array.from(string.matchAll(/(?<=')[a-zA-Z]+(?=')/g))[0] || [])][0] || ''

const getPath = (string: string): string => {
  const segments = string.split(/\s+/g)
  if (segments.length < 3) return ''
  /* istanbul ignore next */
  return [...(Array.from(segments[2].trim().matchAll(/([a-zA-Z]|\/|\[|\])+/g))[0] || [])][0] || ''
}

export const linesToTokens = (lines: string[]): Token[] =>
  lines.reduce((tokens, line) => {
    const [left, right] = getSides(line)
    const root = isRoot(left)
    const name = getName(left)
    let key = getKey(left)
    let path = getPath(left)
    !key && (key = name)
    !path && (path = key || name)
    const contained = right ? pointers(right) : []
    if (!root && !name) throw new Error('Cannot identify name.')
    /* istanbul ignore next */
    if (!root && !key) throw new Error('Cannot identify key.')
    /* istanbul ignore next */
    if (!root && !path) throw new Error('Cannot identify path.')
    tokens.push({ name, key, path, children: contained, root })
    return tokens
  }, [] as Token[])
