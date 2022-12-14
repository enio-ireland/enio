import { Tree, generateFiles, readProjectConfiguration } from '@nrwl/devkit'
import { resolve } from 'path'
import { TypedocGeneratorSchema } from '../../schema'
import { getConfigDefaults } from './getConfigDefaults'

export const configureTypedoc = (tree: Tree, options: TypedocGeneratorSchema): void => {
  const templateSourceFolder = resolve(__dirname, '../../files')
  const project = readProjectConfiguration(tree, options.project)
  const substitutions = { options: getConfigDefaults(project, tree), tmpl: '' }
  generateFiles(tree, templateSourceFolder, project.root, substitutions)
}
