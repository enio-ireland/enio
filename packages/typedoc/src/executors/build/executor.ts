import { BuildExecutorSchema, TypedocOptions } from './schema'
import { ExecutorContext, getPackageManagerCommand, readJsonFile } from '@nrwl/devkit'
import { spawn } from 'child_process'
import { join, relative, resolve, sep } from 'path'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  console.log('Building Typedoc...', options)
  const project = context.workspace.projects[context.projectName]
  const args = toTypedocOptions(options, context)
  const cmd = `${getPackageManagerCommand().exec} typedoc`
  const cmdArgs = toArguments(toTypedocOptions(options, context))
  const cmdOpts = {
    cwd: options.workspaceDocs ? context.root : project.root,
    shell: true
  }

  // if (options.watch && options.exportFormat === 'json') {
  //   createInitialCompodocJson(args);
  // }

  return new Promise<{ success: boolean }>(resolve => {
    console.log({ command, args, processOpts })
    const childProcess = spawn(command, args, processOpts)

    process.on('exit', () => childProcess.kill())
    process.on('SIGTERM', () => childProcess.kill())

    childProcess.stdout.on('data', data => {
      console.info(data.toString())
    })
    childProcess.stderr.on('data', data => {
      console.error(data.toString())
    })

    childProcess.on('close', code => {
      resolve({ success: code === 0 })
    })
  })
}

function toTypedocOptions(options: BuildExecutorSchema, context: ExecutorContext): TypedocOptions {
  const _: [BuildExecutorSchema, ExecutorContext] = [options, context]
  const project = context.workspace.projects[context.projectName]
  return {
    options: options.options,
    tsconfig: options.tsConfig ? resolve(context.root, options.tsConfig) : resolve(project.root, 'tsconfig.json'),
    compilerOptions: options.compilerOptions,
    entryPoints: options.entryPoints,
    entryPointStrategy: options.entryPointStrategy,
    exclude: options.exclude,
    externalPattern: options.externalPattern,
    excludeExternals: options.excludeExternals,
    excludeNotDocumented: options.excludeNotDocumented,
    excludeInternal: options.excludeInternal,
    excludePrivate: options.excludePrivate,
    excludeProtected: options.excludeProtected,
    externalSymbolLinkMappings: options.externalSymbolLinkMappings,
    media: options.media,
    includes: options.workspaceDocs ? createIncludesForWorkspace(..._) : toRelativePath(options.includes, ..._),
    out: options.outputPath ? resolve(context.root, options.outputPath) : resolve('dist', 'typedoc', context.projectName),
    json: options.json,
    pretty: options.pretty,
    emit: options.emit,
    theme: options.theme,
    lightHighlightTheme: options.lightHighlightTheme,
    darkHighlightTheme: options.darkHighlightTheme,
    customCss: options.customCss,
    markedOptions: options.markedOptions,
    name: options.name || (options.workspaceDocs ? readJsonFile('package.json').name : context.projectName),
    includeVersion: options.includeVersion,
    disableSources: options.disableSources,
    basePath: options.basePath,
    excludeTags: options.excludeTags,
    readme: options.readme,
    cname: options.cname,
    sourceLinkTemplate: options.sourceLinkTemplate,
    gitRevision: options.gitRevision,
    gitRemote: options.gitRemote,
    htmlLang: options.htmlLang,
    githubPages: options.githubPages,
    gaID: options.gaID,
    hideGenerator: options.hideGenerator,
    searchInComments: options.searchInComments,
    cleanOutputDir: options.cleanOutputDir,
    titleLink: options.titleLink,
    navigationLinks: options.navigationLinks,
    sidebarLinks: options.sidebarLinks,
    commentStyle: options.commentStyle,
    blockTags: options.blockTags,
    inlineTags: options.inlineTags,
    modifierTags: options.modifierTags,
    categorizeByGroup: options.categorizeByGroup,
    defaultCategory: options.defaultCategory,
    categoryOrder: options.categoryOrder,
    sort: options.sort,
    visibilityFilters: options.visibilityFilters,
    searchCategoryBoosts: options.searchCategoryBoosts,
    searchGroupBoosts: options.searchGroupBoosts,
    watch: options.watch,
    preserveWatchOutput: options.preserveWatchOutput,
    help: options.help,
    showConfig: options.showConfig,
    plugin: options.plugin,
    logger: options.logger,
    logLevel: options.logLevel,
    skipErrorChecking: options.skipErrorChecking,
    validation: options.validation,
    treatWarningsAsErrors: options.treatWarningsAsErrors,
    intentionallyNotExported: options.intentionallyNotExported,
    requiredToBeDocumented: options.requiredToBeDocumented
  }
}

function createIncludesForWorkspace(options: BuildExecutorSchema, context: ExecutorContext): string {
  const tmpDirectory = mkdtempSync(join(tmpdir(), 'compodoc-includes-'))
  writeFileSync(
    join(tmpDirectory, 'summary.json'),
    JSON.stringify(
      Object.entries(context.workspace.projects)
        .map(([projectName, project]) => {
          const readmeFile = join(project.root, 'README.md')
          return { projectName, readmeFile }
        })
        .filter(({ readmeFile }) => existsSync(readmeFile))
        .map(({ projectName, readmeFile }) => {
          const tmpFilename = `${projectName}.md`
          copyFileSync(readmeFile, join(tmpDirectory, tmpFilename))
          return { title: projectName, file: tmpFilename }
        })
    )
  )
  return relative(context.root, tmpDirectory)
}

function toRelativePath(pathInWorkspace: string | undefined, options: BuildExecutorSchema, context: ExecutorContext): string | undefined {
  if (!pathInWorkspace) return undefined
  const project = context.workspace.projects[context.projectName]
  const currentDirectory = options.workspaceDocs ? context.root : project.root
  const absolutePath = resolve(context.root, pathInWorkspace)
  return relative(currentDirectory, absolutePath)
}

function toArguments(options: TypedocOptions): string[] {
  return Object.entries(options)
    .filter(([, value]) => !!value)
    .reduce((args, [key, value]) => {
      let arg = `--${key}`
      if (typeof value !== 'boolean') {
        arg += `="${value}"`
      }
      return [...args, arg]
    }, [])
}

function createInitialCompodocJson(args: Pick<CompodocOptions, 'output'>) {
  mkdirSync(args.output, { recursive: true })
  writeFileSync(
    join(args.output, 'documentation.json'),
    JSON.stringify({
      pipes: [],
      interfaces: [],
      injectables: [],
      guards: [],
      interceptors: [],
      classes: [],
      directives: [],
      components: [],
      modules: [],
      miscellaneous: {
        variables: [],
        functions: [],
        typealiases: [],
        enumerations: [],
        groupedVariables: {},
        groupedFunctions: {},
        groupedEnumerations: {},
        groupedTypeAliases: {}
      }
    })
  )
}
