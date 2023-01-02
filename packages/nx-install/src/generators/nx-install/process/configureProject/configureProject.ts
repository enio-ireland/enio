import { Tree } from '@nrwl/devkit'
import { readProjectConfiguration, updateProjectConfiguration } from '@nrwl/devkit'
import { name } from '../../../../../project.json'

export const configureProject = (tree: Tree, project: string): void => {
  const config = readProjectConfiguration(tree, project)
  config.targets[name] = {
    executor: 'nx:run-commands',
    options: {
      commands: [
        {
          command: 'npm install',
          forwardAllArgs: true
        }
      ],
      cwd: 'packages/data-ferret',
      parallel: false
    }
  }
  updateProjectConfiguration(tree, project, config)
}
