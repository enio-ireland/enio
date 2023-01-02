import { Tree, getProjects, formatFiles } from '@nrwl/devkit'
import { registerNpmScript, registerOperation, configureProject } from './process'

export default async function (tree: Tree) {
  registerNpmScript()
  registerOperation(tree)
  getProjects(tree).forEach(({ name }) => configureProject(tree, name))
  await formatFiles(tree)
}
