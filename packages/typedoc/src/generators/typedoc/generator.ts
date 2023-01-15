import { Tree, formatFiles } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from './schema'
import { addDependencies, registerOperation, configureProject, configureTypedoc, configureGitIgnore } from './process'
import { getGeneratorExecutionParams } from './utils'

export default async function (tree: Tree, { project }: TypedocGeneratorSchema) {
  const { projectConfig, projectName, projectRoot, projectType } = getGeneratorExecutionParams(tree, project)
  const installDependencies = addDependencies(tree)
  registerOperation(tree)
  configureProject(tree, projectConfig, projectName, projectRoot)
  configureTypedoc(tree, projectRoot, projectType, projectName)
  configureGitIgnore(tree, projectRoot)
  await formatFiles(tree)
  return installDependencies
}
