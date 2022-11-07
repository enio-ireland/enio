import { ProjectConfiguration, joinPathFragments } from '@nrwl/devkit'
import { TypeDocOptions, normalizePath } from 'typedoc'

export const getConfigDefaults = (project: ProjectConfiguration): Partial<TypeDocOptions> => ({
  options: joinPathFragments(normalizePath(project.root), 'typedoc.json')
})

// import { TypeDocOptions } from 'typedoc'

// const typeDocOptions = {
//   extends: [],
//   entryPoints: ['./src/index.ts'],
//   out: 'doc',

//   tsconfig: ''

// import { ProjectConfiguration, joinPathFragments } from '@nrwl/devkit'
// import { TypeDocOptions, normalizePath } from 'typedoc'

// export const getConfigDefaults = (project: ProjectConfiguration): Partial<TypeDocOptions> => ({
//   options: joinPathFragments(normalizePath(project.root), 'typedoc.json')
// })

/**
   *
   * outputPath:
      docs/{packages}/{projectName}

        entryPoints

        config file location
   */

// import { Tree, ProjectConfiguration, joinPathFragments } from '@nrwl/devkit'
// import { normalizePath, TypeDocOptions } from 'typedoc'

// export const getConfigDefaults = (project: ProjectConfiguration, tree: Tree): Partial<TypeDocOptions> => {
// import { getTsConfig } from './getTsConfig'
// tsconfig: joinPathFragments(normalizePath(project.root), getTsConfig(project, tree))

// entryPoints: string[];
// entryPointStrategy: typeof EntryPointStrategy;
// exclude: string[];
// externalPattern: string[];
// excludeExternals: boolean;
// excludeNotDocumented: boolean;
// excludeInternal: boolean;
// excludePrivate: boolean;
// excludeProtected: boolean;
// externalSymbolLinkMappings: ManuallyValidatedOption<Record<string, Record<string, string>>>;
// media: string;
// includes: string;
// out: string;
// json: string;
// pretty: boolean;
// emit: typeof EmitStrategy;
// theme: string;
// lightHighlightTheme: ShikiTheme;
// darkHighlightTheme: ShikiTheme;
// customCss: string;
// markedOptions: unknown;
// name: string;
// includeVersion: boolean;
// disableSources: boolean;
// basePath: string;
// excludeTags: `@${string}`[];
// readme: string;
// cname: string;
// sourceLinkTemplate: string;
// gitRevision: string;
// gitRemote: string;
// htmlLang: string;
// githubPages: boolean;
// gaID: string;
// hideGenerator: boolean;
// searchInComments: boolean;
// cleanOutputDir: boolean;
// titleLink: string;
// navigationLinks: ManuallyValidatedOption<Record<string, string>>;
// sidebarLinks: ManuallyValidatedOption<Record<string, string>>;
// commentStyle: typeof CommentStyle;
// blockTags: `@${string}`[];
// inlineTags: `@${string}`[];
// modifierTags: `@${string}`[];
// categorizeByGroup: boolean;
// defaultCategory: string;
// categoryOrder: string[];
// sort: SortStrategy[];
// visibilityFilters: ManuallyValidatedOption<{
//     protected?: boolean;
//     private?: boolean;
//     inherited?: boolean;
//     external?: boolean;
//     [tag: `@${string}`]: boolean;
// }>;
// searchCategoryBoosts: ManuallyValidatedOption<Record<string, number>>;
// searchGroupBoosts: ManuallyValidatedOption<Record<string, number>>;
// watch: boolean;
// preserveWatchOutput: boolean;
// skipErrorChecking: boolean;
// help: boolean;
// version: boolean;
// showConfig: boolean;
// plugin: string[];
// logger: unknown;
// logLevel: typeof LogLevel;
// treatWarningsAsErrors: boolean;
// intentionallyNotExported: string[];
// validation: ValidationOptions;
// requiredToBeDocumented: (keyof typeof ReflectionKind)[];
