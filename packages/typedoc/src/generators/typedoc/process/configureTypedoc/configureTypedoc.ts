import { Tree, generateFiles } from '@nrwl/devkit'
import { resolve } from 'path'
import { getConfigDefaults } from './getConfigDefaults'

export const configureTypedoc = (tree: Tree): void => {
  generateFiles(tree, resolve(__dirname, '../../files'), '', {
    options: getConfigDefaults()
  })
}
