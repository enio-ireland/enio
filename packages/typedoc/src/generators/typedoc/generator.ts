import { Tree, formatFiles } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from './schema'
import { addDependencies, registerOperation, configureProject, configureTypedoc, configureGitIgnore } from './process'
import { getProjectConfig } from './utils'

export default async function (tree: Tree, { project }: TypedocGeneratorSchema) {
  const installDependencies = addDependencies(tree)
  registerOperation(tree)
  const config = getProjectConfig(tree, project)
  configureProject(tree, config, project)
  configureTypedoc(tree, config)
  configureGitIgnore(tree, config)
  await formatFiles(tree)
  return installDependencies
}
