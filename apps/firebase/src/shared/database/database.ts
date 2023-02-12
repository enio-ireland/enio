/* istanbul ignore file */
import { getPaths } from '@enio.ai/path-schema'
import type { DB } from './database.model'

const schema = `
  @root » #projects
  #projects » #opensource #enterprise
  #enterprise 'enterprise' enterprise/[projectName] » #badges
  #opensource 'openSource' opensource/[projectName] » #badges
  #badges 'badges' badge » #build #coverage
  #build 'buildPass' build
  #coverage 'codeCoverage' coverage
`

export const db = getPaths<DB>(schema)
