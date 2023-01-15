import { Tree, generateFiles, ProjectConfiguration } from '@nrwl/devkit'
import { resolve } from 'path'
import { getConfigDefaults } from './getConfigDefaults'

export const configureTypedoc = (tree: Tree, root: ProjectConfiguration['root'], projectType: ProjectConfiguration['projectType'], name: ProjectConfiguration['name']): void => {
  const templateSourceFolder = resolve(__dirname, '../../files')
  const substitutions = { options: getConfigDefaults(tree, projectType, root, name), tmpl: '' }
  generateFiles(tree, templateSourceFolder, root, substitutions)
}
