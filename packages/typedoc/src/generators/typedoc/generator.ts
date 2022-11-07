import { Tree } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from './schema'
import { addDependencies, registerOperation, configureProject, configureTypedoc } from './process'

export default async function (tree: Tree, options: TypedocGeneratorSchema) {
  const installDependencies = addDependencies(tree)
  registerOperation(tree)
  configureProject(tree, options)
  configureTypedoc(tree)
  return installDependencies
}
