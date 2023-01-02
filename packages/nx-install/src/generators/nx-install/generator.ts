import { Tree, getProjects, formatFiles } from '@nrwl/devkit'
import { registerNpmScript, registerOperation, configureProject } from './process'

export default async function (tree: Tree) {
  registerNpmScript()
  registerOperation(tree)
  getProjects(tree).forEach(config => configureProject(tree, config))
  await formatFiles(tree)
}
