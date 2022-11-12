import { ExecutorContext, ProjectConfiguration } from '@nrwl/devkit'

export const getProjectConfiguration = (context: ExecutorContext): ProjectConfiguration => context.workspace.projects[context.projectName]
