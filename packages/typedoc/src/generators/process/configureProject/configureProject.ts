import { Tree, generateFiles } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from '../../typedoc/schema'
import { readProjectConfiguration, updateProjectConfiguration, ProjectConfiguration } from '@nrwl/devkit'
import { getWorkspaceLayout, joinPathFragments } from '@nrwl/devkit'
import { join } from 'path'

// import { name } from '../../../project.json'

type WorkspaceLayout = ReturnType<typeof getWorkspaceLayout>

export const configureProject = (tree: Tree, options: TypedocGeneratorSchema): void => {
  const layout = getWorkspaceLayout(tree)
  const config = readProjectConfiguration(tree, options.project)

  const tsconfig = determineTsconfigFile(tree, options, layout, config)

  // @enio.ai/typedoc

  config.targets.compodoc = {
    executor: `${}:${}`, //'@twittwer/compodoc:compodoc',
    options: {
      tsConfig: joinPathFragments(config.root, tsconfig),
      outputPath: joinPathFragments('dist', 'compodoc', options.project)
    },
    configurations: { json: { exportFormat: 'json' } }
  }
  // if (options.workspaceDocs) {
  //   config.targets.compodoc.options.workspaceDocs = true;
  // }

  updateProjectConfiguration(tree, options.project, config)
}

function determineTsconfigFile(
  tree: Tree,
  options: TypedocGeneratorSchema,
  { appsDir, libsDir }: WorkspaceLayout,
  projectConfiguration: ProjectConfiguration
): string {
  const tsconfig = [
    'tsconfig.compodoc.json',
    ...{
      application: ['tsconfig.editor.json', 'tsconfig.app.json'],
      library: ['tsconfig.lib.json']
    }[projectConfiguration.projectType],
    'tsconfig.json'
  ].find(tsconfig => tree.exists(join(projectConfiguration.root, tsconfig)))
  if (!tsconfig) {
    throw new Error(`Missing tsconfig: Cannot find a "tsconfig[.(compodoc|lib|editor|app)].json" file in "${projectConfiguration.root}".`)
  }

  // if (options.workspaceDocs && tsconfig !== 'tsconfig.compodoc.json') {
  //   const includes = [...new Set([appsDir, libsDir])].map(
  //     (dir) => `${offsetFromRoot(projectConfiguration.root)}${dir}/**/*.ts`,
  //   );
  //   generateFiles(tree, join(__dirname, 'files'), projectConfiguration.root, {
  //     tsconfigBase: `./${tsconfig}`,
  //     includes: includes,
  //     tpl: '',
  //   });
  //   return 'tsconfig.compodoc.json';
  // }

  return tsconfig
}
