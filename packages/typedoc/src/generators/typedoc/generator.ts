import { Tree } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from './schema'
import { addDependencies, registerOperation } from '../process'

export default async function (tree: Tree, options: TypedocGeneratorSchema) {
  const runAddDepenendies = addDependencies(tree)
  registerOperation(tree)
  configureProject(tree, options)
  return runAddDepenendies
}
