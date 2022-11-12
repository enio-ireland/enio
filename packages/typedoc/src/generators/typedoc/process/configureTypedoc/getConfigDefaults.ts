import { joinPathFragments, ProjectConfiguration, Tree } from '@nrwl/devkit'
import { TypeDocOptions } from 'typedoc'
import { getTsConfig } from '../configureProject/getTsConfig'

type CLIOptions = 'options' | 'help' | 'version' | 'showConfig'

export const getConfigDefaults = (project: ProjectConfiguration, tree: Tree): Partial<Omit<TypeDocOptions, CLIOptions>> => ({
  entryPointStrategy: 'expand',
  entryPoints: ['./src'],
  tsconfig: getTsConfig(project, tree),
  compilerOptions: {},
  exclude: ['**/*.(spec|test|e2e).ts', 'docs/**', 'tests/**', 'specs/**', 'spec/**', 'test/**'],
  externalPattern: ['**/node_modules/**'],
  excludeExternals: true,
  excludeInternal: false,
  excludePrivate: false,
  excludeProtected: false,
  excludeNotDocumented: false,
  externalSymbolLinkMappings: {},
  includes: '',
  out: joinPathFragments('../../docs', project.root),
  emit: 'docs',
  theme: 'default',
  customCss: '',
  name: project.name,
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
  categorizeByGroup: false,
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
  logLevel: 'Verbose'
})
