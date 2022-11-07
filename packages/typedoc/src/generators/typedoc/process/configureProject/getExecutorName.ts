import * as pkg from '../../../../../package.json'
import * as project from '../../../../../project.json'

export const getExecutorName = (): string => `${pkg.name}:${project.name}`
