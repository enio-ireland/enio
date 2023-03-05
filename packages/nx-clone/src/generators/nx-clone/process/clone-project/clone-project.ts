import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { Schema } from '../../schema'
import { Locations } from '../check-paths'
import { getFilesAndFolders, RecordType } from '../get-files-and-folders'

const zeroVersion = '0.0.0'

export const cloneProject = ({ workspaceRoot, source, destination }: Locations, schema: Schema): void => {
  const segmentToReplace = join(workspaceRoot, source.folderName, source.projectName)
  const segementReplacement = join(workspaceRoot, destination.folderName, destination.projectName)
  const sourceRecords = getFilesAndFolders(source.fullPath, schema)
  let replaceValues = true
  sourceRecords.forEach(({ type, absolutePath }) => {
    const newAbsolutePath = absolutePath.replace(segmentToReplace, segementReplacement)
    type === RecordType.Folder && !existsSync(newAbsolutePath) && mkdirSync(newAbsolutePath, { recursive: true })
    if (type === RecordType.File) {
      let content = readFileSync(absolutePath, 'utf8').toString()
      if (replaceValues) replaceValues = absolutePath.replace(workspaceRoot, '').split('/').length <= 3
      if (replaceValues) {
        content = content
          .replace(new RegExp(join(source.folderName, source.projectName), 'gm'), join(destination.folderName, destination.projectName))
          .replace(new RegExp(source.projectName, 'gm'), destination.projectName)
      }
      writeFileSync(newAbsolutePath, content, { encoding: 'utf8' })
      if (
        replaceValues &&
        schema.resetPackageVersion &&
        (newAbsolutePath.includes('package.json') || newAbsolutePath.includes('package-lock.json'))
      ) {
        const json = JSON.parse(readFileSync(newAbsolutePath, 'utf8').toString()) as unknown as Record<string, unknown>
        if ('version' in json) json.version = zeroVersion
        if ('name' in json && json.name && json.packages?.['']?.name === json.name && 'version' in json.packages[''])
          json.packages[''].version = zeroVersion
        content = JSON.stringify(json, null, 2)
        writeFileSync(newAbsolutePath, content, { encoding: 'utf8' })
      }
    }
  })
}
