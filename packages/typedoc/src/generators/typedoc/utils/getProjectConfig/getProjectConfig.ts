import { Tree, readProjectConfiguration, ProjectConfiguration } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from '../../schema'

export const getProjectConfig = (tree: Tree, project: TypedocGeneratorSchema['project']): ProjectConfiguration => readProjectConfiguration(tree, project)
