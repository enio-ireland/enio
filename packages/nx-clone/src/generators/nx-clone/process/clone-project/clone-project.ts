import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { Locations } from '../check-paths'
import { getFilesAndFolders, RecordType } from '../get-files-and-folders'

export const cloneProject = ({ workspaceRoot, source, destination }: Locations): void => {
  const segmentToReplace = join(workspaceRoot, source.folderName, source.projectName)
  const segementReplacement = join(workspaceRoot, destination.folderName, destination.projectName)
  const sourceRecords = getFilesAndFolders(source.fullPath)
  let replaceValues = true
  sourceRecords.forEach(({ type, absolutePath }) => {
    const newAbsolutePath = absolutePath.replace(segmentToReplace, segementReplacement)
    type === RecordType.Folder && !existsSync(newAbsolutePath) && mkdirSync(newAbsolutePath, { recursive: true })
    if (type === RecordType.File) {
      let content = readFileSync(absolutePath, 'utf8').toString()
      if (replaceValues) replaceValues = absolutePath.replace(workspaceRoot, '').split('/').length <= 3
      if (replaceValues) {
        content = content
          .replace(join(source.folderName, source.projectName), join(destination.folderName, destination.projectName))
          .replace(source.projectName, destination.projectName)
        writeFileSync(newAbsolutePath, content, { encoding: "utf8" })
      }
    }
  })
}
