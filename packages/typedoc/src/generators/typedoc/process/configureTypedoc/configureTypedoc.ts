import { Tree, generateFiles, ProjectConfiguration } from '@nrwl/devkit'
import { resolve } from 'path'
import { getConfigDefaults } from './getConfigDefaults'

export const configureTypedoc = (tree: Tree, config: ProjectConfiguration): void => {
  const templateSourceFolder = resolve(__dirname, '../../files')
  const substitutions = { options: getConfigDefaults(config, tree), tmpl: '' }
  generateFiles(tree, templateSourceFolder, config.root, substitutions)
}
