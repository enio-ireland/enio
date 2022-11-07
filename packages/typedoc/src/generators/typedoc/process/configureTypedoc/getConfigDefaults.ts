import { ProjectConfiguration, Tree } from '@nrwl/devkit'
import { TypeDocOptions } from 'typedoc'
import { getTsConfig } from '../configureProject/getTsConfig'

type CLIOptions = 'options' | 'help' | 'version' | 'showConfig'

export const getConfigDefaults = (project: ProjectConfiguration, tree: Tree): Partial<Omit<TypeDocOptions, CLIOptions>> => ({
  tsconfig: getTsConfig(project, tree),
  compilerOptions: {},
  entryPoints: ['./src'],
  entryPointStrategy: 'Resolve',
  exclude: ['**/*+(index|.spec|.e2e).ts'],
  externalPattern: [],
  excludeExternals: true,
  excludeNotDocumented: false,
  excludeInternal: true,
  excludePrivate: true,
  excludeProtected: true,
  externalSymbolLinkMappings: {},
  media: 'media', // TODO: Review
  includes: 'docs', // TODO: Review
  out: './docs', // TODO: Review !!! - Optionalize (with default) ?
  emit: 'docs',
  theme: 'default',
  customCss: '',
  name: project.name, // TODO: Review
  includeVersion: true,
  disableSources: false,
  // basePath: '', // TODO: Review
  excludeTags: [],
  readme: 'README.md', // TODO: Review !!!
  cname: '', // TODO: Review !!! - Optionalize (with default) ?
  sourceLinkTemplate: '', // TODO: Review
  gitRevision: 'develop', // TODO: Review !!! - Optionalize (with default, suggestions: develop, master, main) ?
  gitRemote: 'origin', // TODO: Review
  htmlLang: 'en', // TODO: Review - executor prop instead?
  githubPages: true,
  gaID: '',
  hideGenerator: true,
  searchInComments: false, // TODO: Review - ask user?
  cleanOutputDir: true,
  // titleLink: '', // TODO: Review - perhaps autogenerate ?
  navigationLinks: {}, // TODO: Review - perhaps add other .md files found
  sidebarLinks: {}, // TODO: Review - perhaps add other .md files found
  commentStyle: 'jsdoc', // TODO: Review - ask user? but give default
  // blockTags: [],
  // inlineTags: [],
  // modifierTags: [],
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
  watch: false, // REVIEW - make option in executor
  preserveWatchOutput: false,
  skipErrorChecking: true, // REVIEW - is it the same as ignoreCompilerErrors?
  // plugin: [],
  // logger: ...,
  logLevel: 'Warn',
  treatWarningsAsErrors: false,
  intentionallyNotExported: [],
  validation: {
    notExported: true,
    invalidLink: true,
    notDocumented: true
  },
  requiredToBeDocumented: [] // Review (keyof typeof ReflectionKind)[]; validation.notDocumented
  // Options seem deprecated - REVIEW !!!
  // inputFiles: [
  //   './src'
  // ],
  // mode: 'file',
  // includeDeclarations: true,
  // ignoreCompilerErrors: true,
  // plugin: 'none',
  // listInvalidSymbolLinks: true,
  // disableOutputCheck: false
  // excludeNotExported: true // TODO: Deprecated? Review !!! - Linked to mode.
})
