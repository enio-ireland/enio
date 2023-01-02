import { Tree, readRootPackageJson, writeJsonFile, getProjects, formatFiles } from '@nrwl/devkit'
import { registerOperation, configureProject } from './process'

export default async function (tree: Tree) {
  console.log('@json:', readRootPackageJson())
  registerOperation(tree)
  getProjects(tree).forEach(({ name }) => configureProject(tree, name))
  await formatFiles(tree)
}
