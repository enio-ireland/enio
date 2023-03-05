import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import type { Schema } from '../../schema'
import type { Record, SkipCondition } from './model'
import { RecordType } from './model'

const createPatternsToSkip = (schema: Schema): string[] => {
  const { nodeModules, changeLog, license, readMe } = { ...schema }
  const patterns: string[] = []
  !nodeModules && patterns.push('node_modules')
  !changeLog && patterns.push('CHANGELOG.md', 'CHANGE_LOG')
  !license && patterns.push('LICENSE', 'LICENCE')
  !readMe && patterns.push('README', 'READ_ME')
  return patterns
}

const createSkipCondition =
  (patternsToSkip: string[]): SkipCondition =>
  absolutePath =>
    patternsToSkip.some(p => absolutePath.includes(p))

const sortAlphabeticallyAndLength = (a: Record, b: Record): number =>
  a.absolutePath < b.absolutePath ? -1 : a.absolutePath > b.absolutePath ? 1 : 0

const traverseThroughDirectory = (directory: string, shouldSkip: SkipCondition, list: Record[]): Record[] => {
  if (shouldSkip(directory)) return list
  list.push({ type: RecordType.Folder, absolutePath: directory })
  readdirSync(directory).forEach(file => {
    const absolutePath = join(directory, file)
    if (shouldSkip(absolutePath)) return list
    if (statSync(absolutePath).isDirectory()) traverseThroughDirectory(absolutePath, shouldSkip, list)
    else return list.push({ type: RecordType.File, absolutePath })
  })
  return list
}

export const getFilesAndFolders = (originPath: string, schema: Schema): Record[] => {
  const patternsToSkip = createPatternsToSkip(schema)
  const skipCondition = createSkipCondition(patternsToSkip)
  return traverseThroughDirectory(originPath, skipCondition, []).sort(sortAlphabeticallyAndLength)
}
