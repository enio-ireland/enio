import { Tree, formatFiles } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from './schema'
import { addDependencies, registerOperation, configureProject, configureTypedoc, configureGitIgnore } from './process'

export default async function (tree: Tree, options: TypedocGeneratorSchema) {
  const installDependencies = addDependencies(tree)
  registerOperation(tree)
  configureProject(tree, options)
  configureTypedoc(tree, options)
  configureGitIgnore(tree, options)
  await formatFiles(tree)
  return installDependencies
}
