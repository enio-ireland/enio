import { addDependenciesToPackageJson, Tree, GeneratorCallback } from '@nrwl/devkit'
import { peerDependencies } from '../../../../package.json'

export const addDependencies = (tree: Tree): GeneratorCallback => {
  const dependencies: Record<string, string> = {}
  const devDependencies: Record<string, string> = { typedoc: peerDependencies.typedoc }
  return addDependenciesToPackageJson(tree, dependencies, devDependencies)
}
