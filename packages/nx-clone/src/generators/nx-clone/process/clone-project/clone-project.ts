import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'fs'
import { join, sep } from 'path'
import * as mimeTypes from 'mime-types'
import type { Schema } from '../../schema'
import { Locations } from '../check-paths'
import { getFilesAndFolders, RecordType } from '../get-files-and-folders'

const versionZero = '0.0.0'

const createDirectory = (type: RecordType, fullPath: string): void => {
  type === RecordType.Folder && !existsSync(fullPath) && mkdirSync(fullPath, { recursive: true })
}

const isImage = (path: string): boolean => mimeTypes.lookup(path).toString().includes('image')

const locatedAtRoot = (srcPath: string, source: Locations['source']) => srcPath.replace(source.fullPath, '').split(sep).length === 2

const updateContent = (destPath: string, source: Locations['source'], destination: Locations['destination']) => {
  const content = readFileSync(destPath, 'utf-8')
    .replace(new RegExp([source.folderName, source.projectName].join('/'), 'gm'), [destination.folderName, destination.projectName].join('/'))
    .replace(new RegExp(source.projectName, 'gm'), destination.projectName)
  writeFileSync(destPath, content, 'utf-8')
}

const resetPackageVersion = (destPath: string): void => {
  const json = JSON.parse(readFileSync(destPath, 'utf8').toString()) as unknown as Record<string, unknown>
  if ('version' in json) json.version = versionZero
  if ('name' in json && json.name && json.packages?.['']?.name === json.name && 'version' in json.packages[''])
    json.packages[''].version = versionZero
  writeFileSync(destPath, JSON.stringify(json, null, 2), { encoding: 'utf8' })
}

const createFile = (type: RecordType, srcPath: string, destPath: string, locations: Locations, schema: Schema): void => {
  if (type !== RecordType.File) return
  copyFileSync(srcPath, destPath)
  if (isImage(srcPath) || !locatedAtRoot(srcPath, locations.source)) return
  updateContent(destPath, locations.source, locations.destination)
  if (!schema.resetPackageVersion || !/package(-lock)*\.json/.test(destPath)) return
  resetPackageVersion(destPath)
}

export const cloneProject = (location: Locations, schema: Schema): void => {
  const { workspaceRoot, source, destination } = location
  const sourceRootPath = join(workspaceRoot, source.folderName, source.projectName)
  const destinationRootPath = join(workspaceRoot, destination.folderName, destination.projectName)
  const sourceRecords = getFilesAndFolders(source.fullPath, schema)
  sourceRecords.forEach(({ type, absolutePath }) => {
    const newPath = absolutePath.replace(sourceRootPath, destinationRootPath)
    createDirectory(type, newPath)
    createFile(type, absolutePath, newPath, location, schema)
  })
}
