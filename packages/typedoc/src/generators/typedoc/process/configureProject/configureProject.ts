import { Tree, ProjectConfiguration } from '@nrwl/devkit'
import { updateProjectConfiguration } from '@nrwl/devkit'
import { getExecutorName } from './getExecutorName'
import { name } from '../../../../../project.json'

export const configureProject = (tree: Tree, config: ProjectConfiguration, projectName: ProjectConfiguration['name']): void => {
  config.targets[name] = {
    executor: getExecutorName(),
    options: { options: 'typedoc.json' },
    configurations: {}
  }
  updateProjectConfiguration(tree, projectName, config)
}
