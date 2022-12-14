import { Tree } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from '../../schema'
import { readProjectConfiguration, updateProjectConfiguration } from '@nrwl/devkit'
import { getExecutorName } from './getExecutorName'
import { name } from '../../../../../project.json'

export const configureProject = (tree: Tree, options: TypedocGeneratorSchema): void => {
  const config = readProjectConfiguration(tree, options.project)
  config.targets[name] = {
    executor: getExecutorName(),
    options: { options: 'typedoc.json' },
    configurations: {}
  }
  updateProjectConfiguration(tree, options.project, config)
}
