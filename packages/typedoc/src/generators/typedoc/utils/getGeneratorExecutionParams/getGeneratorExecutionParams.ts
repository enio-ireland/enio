import { Tree, joinPathFragments } from '@nrwl/devkit'
import { outputFolder } from '../'
import { TypedocGeneratorSchema } from '../../schema'
import { getProjectConfig } from '../getProjectConfig/getProjectConfig'
import { GeneratorExecutionParams } from './getGeneratorExecutionParams.model'
import { isNotObject, isNotValidString, throwError, isMissingFromContext, isMissingFromProjectConfig, reviewNxVersion } from './getGeneratorExecutionParams.utils'

export const getGeneratorExecutionParams = (tree: Tree, project: TypedocGeneratorSchema['project']): GeneratorExecutionParams => {
  if (isNotObject(tree)) throwError(isMissingFromContext('Virtual file system tree'), reviewNxVersion)
  if (isNotValidString(project)) throwError(isMissingFromContext('Project name'), 'Review project name is correctly passed to typedoc command')

  const config = getProjectConfig(tree, project)

  if (isNotObject(config)) throwError(isMissingFromContext(`Configuration for ${project}`), 'Check project.json file exists', reviewNxVersion)
  if (isNotValidString(config.root)) throwError(isMissingFromProjectConfig('root'), reviewNxVersion)
  if (isNotValidString(config.projectType)) throwError(isMissingFromProjectConfig('projectType'), reviewNxVersion)
  if (isNotValidString(config.name)) console.warn(isMissingFromProjectConfig('name'))

  return {
    projectConfig: config,
    projectName: config.name || project,
    projectRoot: config.root,
    projectType: config.projectType,
    outputDir: joinPathFragments(outputFolder, config.root)
  }
}


