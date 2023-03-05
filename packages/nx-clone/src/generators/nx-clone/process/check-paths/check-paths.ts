import { join } from 'path'
import { existsSync } from 'fs'
import { workspaceRoot } from '@nrwl/devkit'
import type { Schema } from '../../schema'
import type { Locations } from './model'

const INVALID_DESTINATION = (path: string) => `Invalid destination: [${path}]`

const checkPathSyntax = (path: string, pathType: 'source' | 'destination'): void => {
  if (!path) throw new Error(`${INVALID_DESTINATION(path)} - Please specify a ${pathType} path.`)
  if (path.includes('..')) throw new Error(`${INVALID_DESTINATION(path)} - Please specify an explicit ${pathType} path.`)
  if (!path.includes('/')) throw new Error(`${INVALID_DESTINATION(path)} - Please specify the folder containing the ${pathType} project.`)
}

const getFullPath = (path: string): string => join(workspaceRoot, path)

/**
 * Checks the source and destination path's syntax and viability and returns the corresponding full path.
 */
export function checkPaths(schema: Schema): Locations {
  const { source, destination } = { ...schema }
  if (source === destination) throw new Error(`${INVALID_DESTINATION(source)} - The destination path cannot be the same as the source.`)
  checkPathSyntax(source, 'source')
  checkPathSyntax(destination, 'destination')
  const [sourceFolder, sourceProjectName] = source.split('/')
  const [destinationFolder, destinationProjectName] = destination.split('/')
  const sourceFullPath = getFullPath(source)
  if (!existsSync(sourceFullPath)) throw new Error(`${INVALID_DESTINATION(source)} - The source path does not exist.`)
  const destinationFullPath = getFullPath(destination)
  if (existsSync(destinationFullPath)) throw new Error(`${INVALID_DESTINATION(destination)} - The destination path is not empty.`)
  return {
    workspaceRoot,
    source: {
      folderName: sourceFolder,
      projectName: sourceProjectName,
      fullPath: sourceFullPath
    },
    destination: {
      folderName: destinationFolder,
      projectName: destinationProjectName,
      fullPath: destinationFullPath
    }
  }
}
