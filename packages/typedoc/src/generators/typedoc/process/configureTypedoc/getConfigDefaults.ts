import { joinPathFragments, ProjectConfiguration, Tree } from '@nrwl/devkit'
import { TypeDocOptions } from 'typedoc'
import { getTsConfig } from '../configureProject/getTsConfig'
import { outputFolder } from '../../utils'

type CLIOptions = 'options' | 'help' | 'version' | 'showConfig'

export const getConfigDefaults = (
  tree: Tree,
  projectType: ProjectConfiguration['projectType'],
  root: ProjectConfiguration['root'],
  name: ProjectConfiguration['name']
): Partial<Omit<TypeDocOptions, CLIOptions>> => ({
  entryPointStrategy: 'expand',
  entryPoints: ['./src/lib'],
  tsconfig: getTsConfig(projectType, root, tree),
  compilerOptions: {},
  exclude: ['**/*.(spec|test|e2e).ts', `${outputFolder}/**`, 'tests/**', 'specs/**', 'spec/**', 'test/**', '**/index.ts'],
  externalPattern: ['**/node_modules/**'],
  excludeExternals: true,
  excludeInternal: false,
  excludePrivate: false,
  excludeProtected: false,
  excludeNotDocumented: false,
  externalSymbolLinkMappings: {},
  includes: '',
  out: joinPathFragments(`../../${outputFolder}`, root),
  emit: 'docs',
  theme: 'hierarchy',
  name,
  includeVersion: true,
  readme: './README.md',
  disableSources: false,
  excludeTags: [],
  cname: '',
  sourceLinkTemplate: '',
  gitRevision: 'develop',
  gitRemote: 'origin',
  htmlLang: 'en',
  githubPages: true,
  gaID: '',
  hideGenerator: true,
  searchInComments: false,
  cleanOutputDir: true,
  titleLink: '',
  navigationLinks: {},
  sidebarLinks: {},
  commentStyle: 'all',
  categorizeByGroup: true,
  defaultCategory: 'Other',
  categoryOrder: [],
  sort: ['visibility', 'required-first', 'source-order'],
  visibilityFilters: {
    protected: true,
    private: true,
    inherited: true,
    external: true
  },
  searchCategoryBoosts: {},
  searchGroupBoosts: {},
  preserveWatchOutput: false,
  skipErrorChecking: false,
  validation: {
    notExported: true,
    invalidLink: true,
    notDocumented: true
  },
  requiredToBeDocumented: [],
  treatWarningsAsErrors: false,
  intentionallyNotExported: [],
  logLevel: 'Verbose',
  plugin: ['typedoc-plugin-rename-defaults', 'typedoc-theme-hierarchy']
})
