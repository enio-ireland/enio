import { Reference } from '../shared/model'
import { parseSchema } from '../parseSchema/parseSchema'
import { getRoot } from '../getRoot/getRoot'
import { getReference } from '../getReference/getReference'

export const getPaths = <T = Reference>(schema: string): T => {
  if (typeof schema !== 'string') throw new Error('Expected schema to be a string.')
  if (!schema) throw new Error('Expected schema to be defined.')
  if (/^\s+$/g.test(schema)) throw new Error('Expected schema not to be an empty string.')
  const orphanHashMatches = Array.from(schema.match(/#(?!\w+)/gm) || [])
  if (orphanHashMatches.length)
    throw new Error(
      'Syntax Error: Encountered an orphan # symbol. # symbol is used to declare a path, and must be immediately followed by a word.'
    )
  const orphanAtSymbolMatches = Array.from(schema.match(/@(?!root)/gm) || [])
  if (orphanAtSymbolMatches.length)
    throw new Error(
      "Syntax Error: Encountered an orphan @ symbol. @ symbol can only be used like so '@root' to define the entry point to the schema."
    )
  const emptySquareBracket = Array.from(schema.match(/\[\s*\]/gm) || [])
  if (emptySquareBracket.length) throw new Error('Syntax Error: Encountered square brackets not enclosing a word.')
  const openingSquareBracketCount = Array.from(schema.match(/\[/gm) || []).length
  const closingSquareBracketCount = Array.from(schema.match(/\]/gm) || []).length
  if (openingSquareBracketCount !== closingSquareBracketCount) throw new Error('Syntax Error: Found an orphan bracket symbol.')
  if (/\/{2,}/gm.test(schema)) throw new Error('Syntax Error: Consecutive forward slash symbols are not allowed.')
  if (/(\/\s+|\s+\/|^\/|\/$)/gm.test(schema)) throw new Error('Syntax Error: Expected forward slash symbol is only allowed between words.')
  const rootMatches = Array.from(schema.match(/@root/gm) || [])
  if (rootMatches.length === 0) throw new Error('Expected root to be declared.')
  if (rootMatches.length > 1) throw new Error('Expected a single root declaration, found more than one.')
  const tokens = parseSchema(schema)
  const root = getRoot(tokens)
  const reference = getReference(root, tokens, [])
  return reference as unknown as T
}
