import { Tree, ProjectConfiguration } from '@nrwl/devkit'
import { updateProjectConfiguration } from '@nrwl/devkit'

export const configureProject = (tree: Tree, config: ProjectConfiguration): void => {
  config.targets['nx-install'] = {
    executor: 'nx:run-commands',
    options: {
      commands: [
        {
          command: 'npm install',
          forwardAllArgs: true
        }
      ],
      cwd: config.root,
      parallel: false
    }
  }
  updateProjectConfiguration(tree, config.name, config)
}
