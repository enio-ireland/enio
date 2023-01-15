import { ProjectConfiguration, Tree } from '@nrwl/devkit'
import { join } from 'path'

export const getTsConfig = (projectType: ProjectConfiguration['projectType'], root: ProjectConfiguration['root'], tree: Tree): string => {
  const names = (tokens: string[]) => tokens.map(token => `tsconfig.${token}.json`)
  const application = ['editor', 'app']
  const library = ['lib']
  const tsConfigs = [...names({ application, library }[projectType]), 'tsconfig.json']
  const tsconfig = tsConfigs.find(name => tree.exists(join(root, name)))
  if (!tsconfig) {
    throw new Error(`Missing tsconfig: Cannot find a "tsconfig[.(lib|editor|app)].json" file in "${root}".`)
  }
  return tsconfig
}
