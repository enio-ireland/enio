import { Tree, formatFiles } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from './schema'
import { addDependencies, registerOperation, configureProject, configureTypedoc, configureGitIgnore } from './process'
import { getProjectConfig } from './utils'

export default async function (tree: Tree, { project }: TypedocGeneratorSchema) {
  const installDependencies = addDependencies(tree)
  registerOperation(tree)
  const config = getProjectConfig(tree, project)
  configureProject(tree, config, config.name)
  configureTypedoc(tree, config.root, config.projectType, config.name)
  configureGitIgnore(tree, config.root)
  await formatFiles(tree)
  return installDependencies
}
