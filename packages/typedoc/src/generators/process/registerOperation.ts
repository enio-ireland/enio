import { Tree, readWorkspaceConfiguration, updateWorkspaceConfiguration } from '@nrwl/devkit'
import { name } from '../../../project.json'

export const registerOperation = (tree: Tree): void => {
  const config = { ...readWorkspaceConfiguration(tree) }

  if (!config.tasksRunnerOptions) {
    config.tasksRunnerOptions = {}
  }

  if (!config.tasksRunnerOptions.default) {
    config.tasksRunnerOptions.default = { runner: '@nrwl/nx-cloud', options: {} }
  }

  if (!config.tasksRunnerOptions.default.options.cacheableOperations) {
    config.tasksRunnerOptions.default.options.cacheableOperations = []
  }

  if (!config.tasksRunnerOptions.default.options.cacheableOperations.includes(name)) {
    config.tasksRunnerOptions.default.options.cacheableOperations.push(name)
  }

  updateWorkspaceConfiguration(tree, config)
}
