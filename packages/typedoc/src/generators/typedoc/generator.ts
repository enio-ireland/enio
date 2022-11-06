import { Tree } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from './schema'
import { addDependencies } from '../process'


export default async function (tree: Tree, options: TypedocGeneratorSchema) {
  const runAddDepenendies = addDependencies(tree)
}
