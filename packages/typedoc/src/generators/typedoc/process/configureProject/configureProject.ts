import { Tree, joinPathFragments } from '@nrwl/devkit'
import { updateProjectConfiguration } from '@nrwl/devkit'
import { getExecutorName } from './getExecutorName'
import { name } from '../../../../../project.json'
import { GeneratorExecutionParams } from '../../utils'

export const configureProject = (tree: Tree, config: GeneratorExecutionParams['projectConfig'], projectRoot: GeneratorExecutionParams['projectRoot'], projectName: GeneratorExecutionParams['projectName']): void => {
  config.targets[name] = {
    executor: getExecutorName(),
    outputs: [joinPathFragments('docs', projectRoot)],
    options: {options: 'typedoc.json' },
    configurations: {}
  }
  updateProjectConfiguration(tree, projectName, config)
}
