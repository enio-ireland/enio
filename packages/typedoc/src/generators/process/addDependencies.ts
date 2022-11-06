import { addDependenciesToPackageJson, Tree, GeneratorCallback } from '@nrwl/devkit';

export const addDependencies = (tree: Tree): GeneratorCallback => {
  const dependencies: Record<string, string> = {}
  const devDependencies: Record<string, string> = { typedoc: '^0.23.20' } // See https://github.com/TypeStrong/typedoc/blob/master/package.json
  return addDependenciesToPackageJson(tree, dependencies, devDependencies);
}
