import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { Record, RecordType } from './model'

const sortAlphabeticallyAndLength = (a: Record, b: Record): number => a.absolutePath < b.absolutePath ? -1 : a.absolutePath > b.absolutePath ? 1 : 0

const traverseThroughDirectory = (directory: string, list: Record[]): Record[] => {
  list.push({ type: RecordType.Folder, absolutePath: directory })
  readdirSync(directory).forEach(file => {
    const absolutePath = join(directory, file)
    if (statSync(absolutePath).isDirectory()) traverseThroughDirectory(absolutePath, list)
    else return list.push({ type: RecordType.File, absolutePath })
  })
  return list
}

export const getFilesAndFolders = (originPath: string): Record[] => traverseThroughDirectory(originPath, []).sort(sortAlphabeticallyAndLength)
