import { Tree, ProjectConfiguration } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from '../../schema'
import { updateProjectConfiguration } from '@nrwl/devkit'
import { getExecutorName } from './getExecutorName'
import { name } from '../../../../../project.json'

export const configureProject = (tree: Tree, config: ProjectConfiguration, projectName: TypedocGeneratorSchema['project']): void => {
  config.targets[name] = {
    executor: getExecutorName(),
    options: { options: 'typedoc.json' },
    configurations: {}
  }
  updateProjectConfiguration(tree, projectName, config)
}
