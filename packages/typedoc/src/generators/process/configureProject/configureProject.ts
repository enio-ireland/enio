import { joinPathFragments, normalizePath, Tree } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from '../../typedoc/schema'
import { readProjectConfiguration, updateProjectConfiguration } from '@nrwl/devkit'
import { getExecutorName } from './getExecutorName'
import { name } from '../../../../project.json'

export const configureProject = (tree: Tree, options: TypedocGeneratorSchema): void => {
  const config = readProjectConfiguration(tree, options.project)
  config.targets[name] = {
    executor: getExecutorName(),
    options: { options: joinPathFragments(normalizePath(config.root), 'typedoc.json') },
    configurations: {}
  }
  updateProjectConfiguration(tree, options.project, config)
}
