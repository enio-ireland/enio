import { Tree } from '@nrwl/devkit'
import { updateProjectConfiguration } from '@nrwl/devkit'
import { getExecutorName } from './getExecutorName'
import { name } from '../../../../../project.json'
import { GeneratorExecutionParams } from '../../utils'

export const configureProject = (tree: Tree, config: GeneratorExecutionParams['projectConfig'], projectName: GeneratorExecutionParams['projectName'], outputDir: GeneratorExecutionParams['outputDir']): void => {
  config.targets[name] = {
    executor: getExecutorName(),
    outputs: [outputDir],
    options: {options: 'typedoc.json' },
    configurations: {}
  }
  updateProjectConfiguration(tree, projectName, config)
}
