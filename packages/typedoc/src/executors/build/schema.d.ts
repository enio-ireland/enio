export interface BuildExecutorSchema
  extends Omit<TypedocOptions, 'tsconfig' | 'output' | 'minimal'> {
  tsConfig?: TypedocOptions['tsconfig'];
  outputPath?: TypedocOptions['output'];

  /** @default false */
  workspaceDocs: boolean;
}

export interface TypedocOptions {
  /**
   * Specify an option file that should be loaded.
   * If not specified TypeDoc will look for typedoc.json and typedoc.js in the current directory. The JSON file should return an object whose keys are the option names.
   */
  options: string

  /**
   * Specify a tsconfig.json file that options should be read from.
   * If not specified TypeDoc will look for tsconfig.json in the current directory and parent directories like tsc does.\nWhen TypeDoc loads a tsconfig.json file, it also will read TypeDoc options declared under the typedocOptions key and look for a tsdoc.json file in the same directory to read the supported tags.
   */
  tsconfig: string

  /**
   * Used to selectively override compiler options for generating documentation. Values set with this option will override options read from tsconfig.json.
   */
  compilerOptions: CompilerOptions

  /**
   * Specifies the entry points to be documented by TypeDoc. TypeDoc will examine the exports of these files and create documentation according to the exports.
   */
  entryPoints: string

  /**
   * Defines how entry points can be handled.
   *  @default 'resolve'
   */
  entryPointStrategy: EntryPointStrategy
}

interface CompilerOptions {

}

enum EntryPointStrategy {
  resolve = 'resolve',
  expand = 'expand',
  packages = 'packages'
}

// TODO: Convert this into types
// {
//   "exclude": {
//     "description": "Exclude files by the given pattern when a path is provided as source.",
//     "type": "string"
//   },
//   "externalPattern": {
//     "description": "Define patterns for extra files that should be considered external. Can be used along with --excludeExternals to remove external modules from the documentation.",
//     "type": "string"
//   },
//   "excludeExternals": {
//     "description": "Prevent externally resolved TypeScript files from being documented.",
//     "type": "boolean",
//     "default": false
//   },
//   "excludeNotDocumented": {
//     "description": "Removes symbols from the generated documentation which do not have an associated doc comment.",
//     "type": "boolean"
//   },
//   "excludeInternal": {
//     "description": "Removes symbols annotated with the @internal doc tag. Defaults to true if the stripInternal compiler option is set to true, otherwise defaults to false.",
//     "type": "boolean"
//   },
//   "excludePrivate": {
//     "description": "Removes protected class members from the generated documentation. Defaults to false.",
//     "type": "boolean",
//     "default": false
//   },
//   "excludeProtected": {
//     "description": "Removes protected class members from the generated documentation. Defaults to false.",
//     "type": "boolean",
//     "default": false
//   },
//   "externalSymbolLinkMappings": {
//     "description": "Can be used to specify locations of externally defined types.",
//     "type": "object"
//   },
//   "media": {
//     "description": "Specifies a media directory that will be copied to the output file.",
//     "type": "string"
//   },
//   "includes": {
//     "description": "Specifies a directory with files that can be injected into the generated documentation with [[include:file.md]] in a doc comment.",
//     "type": "string"
//   },
//   "out": {
//     "description": "Specifies the location the html documentation should be written to.",
//     "type": "string"
//   },
//   "json": {
//     "description": "Specifies the location to output a JSON file containing all of the reflection data.",
//     "type": "string"
//   },
//   "pretty": {
//     "description": "Tells TypeDoc to pretty-format the JSON output. Defaults to true.",
//     "type": "boolean",
//     "default": true
//   },
//   "emit": {
//     "description": "Instructs TypeDoc to write compiled output files as tsc does.",
//     "type": "string",
//     "enum": ["docs", "both", "none"],
//     "default": "docs"
//   },
//   "theme": {
//     "description": "Specify the theme name that should be used. TypeDoc 0.22 contains architectural changes which breaks themes developed for TypeDoc 0.21 and earlier.",
//     "type": "string",
//     "default": "default"
//   },
//   "lightHighlightTheme": {
//     "description": "Specify the Shiki theme to be used to highlight code snippets in light mode.",
//     "type": "string"
//   },
//   "darkHighlightTheme": {
//     "description": "Specify the Shiki theme to be used to highlight code snippets in dark mode.",
//     "type": "string"
//   },
//   "customCss": {
//     "description": "Specifies an extra CSS file that should be copied into the assets directory and referenced by the theme.",
//     "type": "string"
//   },
//   "markedOptions": {
//     "description": "Specifies the options that are forwarded to Marked when parsing doc comments.",
//     "type": "object",
//     "default": {
//       "mangle": false
//     }
//   },
//   "name": {
//     "description": "Set the name of the project that will be used in the header of the template. The name defaults to the package name and current version according to your package.json.",
//     "type": "string"
//   },
//   "includeVersion": {
//     "description": "Adds the package version to the project's name.",
//     "type": "boolean"
//   },
//   "disableSources": {
//     "description": "Disables the defined in text describing where a reflection was created.",
//     "type": "boolean"
//   },
//   "basePath": {
//     "description": "Specifies the base path to be used when displaying file paths. If not set, TypeDoc will guess by taking the lowest common directory to all source files.",
//     "type": "string"
//   },
//   "excludeTags": {
//     "description": "Specify tags that should be removed from doc comments when parsing.",
//     "type": "boolean"
//   },
//   "readme": {
//     "description": "Path to the readme file that should be displayed on the index page. Pass none to disable the index page and start the documentation on the globals page.",
//     "type": "string"
//   },
//   "cname": {
//     "description": "Create a CNAME file in the output directory with the specified text.",
//     "type": "string"
//   },
//   "sourceLinkTemplate": {
//     "description": "Specify a link template to be used when generating source urls. If not set, will be automatically created using the git remote for GitHub, GitLab, and BitBucket urls. Supports {path}, {line}, and {gitRevision} placeholders.",
//     "type": "string"
//   },
//   "gitRevision": {
//     "description": "Use specified revision or branch instead of the last revision for linking to source files. Defaults to the last commit.",
//     "type": "string"
//   },
//   "gitRemote": {
//     "description": "Use the specified git remote instead of origin for linking to source files in GitHub, Bitbucket, or GitLab. You can use git remote to view a list of valid remotes.",
//     "type": "string"
//   },
//   "htmlLang": {
//     "description": "Sets the lang attribute in TypeDoc's HTML output, defaults to en, resulting in <html lang='en'",
//     "type": "string",
//     "default": "en"
//   },
//   "githubPages": {
//     "description": "When enabled, automatically add a .nojekyll file to the output directory to prevent GitHub Pages from processing your documentation site using Jekyll. If you have scoped packages, TypeDoc generates HTML files that start with _ which are ignored by Jekyll. Defaults to true.",
//     "type": "boolean",
//     "default": true
//   },
//   "gaID": {
//     "description": "Set the Google Analytics tracking ID and activate tracking code.",
//     "type": "string"
//   },
//   "hideGenerator": {
//     "description": "Do not print the TypeDoc link at the end of the page. Defaults to false.",
//     "type": "boolean",
//     "default": false
//   },
//   "searchInComments": {
//     "description": "Enables searching comment text in the generated documentation site.",
//     "type": "boolean"
//   },
//   "cleanOutputDir": {
//     "description": "Can be used to prevent TypeDoc from cleaning the output directory specified with --out.",
//     "type": "boolean"
//   },
//   "titleLink": {
//     "description": "Sets the link the title in the header points to. Defaults to the documentation homepage.",
//     "type": "string"
//   },
//   "navigationLinks": {
//     "description": "Defines additional links to be included in the page header.",
//     "type": "object"
//   },
//   "sidebarLinks": {
//     "description": "Defines additional links to be included in the page sidebar.",
//     "type": "object"
//   },
//   "commentStyle": {
//     "description": "Determines what comment types TypeDoc will use.",
//     "type": "string",
//     "enum": ["jsdoc", "block", "line", "all"],
//     "default": "jsdoc"
//   },
//   "blockTags": {
//     "description": "Override TypeDoc's supported block tags, emit warnings for any tags not listed here. This option will be set by tsdoc.json if present.",
//     "type": "array",
//     "items": {
//       "type": "string"
//     }
//   },
//   "inlineTags": {
//     "description": "Override TypeDoc's supported inline tags, emit warnings for any tags not listed here. This option will be set by tsdoc.json if present.",
//     "items": {
//       "type": "string"
//     }
//   },
//   "modifierTags": {
//     "description": "Override TypeDoc's supported modifier tags, emit warnings for any tags not listed here. This option will be set by tsdoc.json if present.",
//     "items": {
//       "type": "string"
//     }
//   },
//   "categorizeByGroup": {
//     "description": "This flag categorizes reflections by group (within properties, methods, etc). To allow methods and properties of the same category to be grouped together, set this flag to false. Defaults to true.",
//     "type": "boolean",
//     "default": true
//   },
//   "defaultCategory": {
//     "description": "Sets the name for the default category which is used when only some elements of the page are categorized. Defaults to 'Other'",
//     "type": "string",
//     "default": "Other"
//   },
//   "categoryOrder": {
//     "description": "Array option which allows overriding the order categories display in.",
//     "items": {
//       "type": "string"
//     }
//   },
//   "sort": {
//     "description": "Specifies the sort order for members. Sorting strategies will be applied in order. If an earlier sorting strategy determines the relative ordering of two reflections, later ordering strategies will not be applied.",
//     "type": "array",
//     "items": {
//       "type": "string",
//       "enum": [
//         "source-order",
//         "alphabetical",
//         "enum-value-ascending",
//         "enum-value-descending",
//         "static-first",
//         "instance-first",
//         "visibility",
//         "required-first"
//       ]
//     }
//   },
//   "visibilityFilters": {
//     "description": "Specifies the available filters when viewing a page.",
//     "type": "object",
//     "properties": {
//       "protected": {
//         "type": "boolean"
//       },
//       "private": {
//         "type": "boolean"
//       },
//       "inherited": {
//         "type": "boolean"
//       },
//       "external": {
//         "type": "boolean"
//       }
//     },
//     "default": {
//       "protected": true,
//       "private": true,
//       "inherited": true,
//       "external": true
//     }
//   },
//   "searchCategoryBoosts": {
//     "description": "Configure the search to increase the relevance of items in a given category.",
//     "type": "object"
//   },
//   "searchGroupBoosts": {
//     "description": "Configure the search to increase the relevance of items in a given group.",
//     "type": "object"
//   },
//   "watch": {
//     "description": "Use TypeScript's incremental compiler to watch source files for changes and build the docs on change. May be combined with --emit.",
//     "type": "boolean"
//   },
//   "preserveWatchOutput": {
//     "description": "By default, --watch clears the screen between compilation steps. If --preserveWatchOutput is specified, this behavior is disabled.",
//     "type": "boolean"
//   },
//   "help": {
//     "description": "Prints TypeDoc's version."
//   },
//   "showConfig": {
//     "description": "Print TypeDoc's config and exit. Useful for debugging what options have been set."
//   },
//   "plugin": {
//     "description": "Specifies the plugins that should be loaded. By default, all installed npm packages with one of the following in their keywords will be loaded.",
//     "type": "string",
//     "enum": ["typedocplugin", "typedoc-plugin", "typedoc-theme"]
//   },
//   "logger": {
//     "description": "Specifies the logger to write output to. When using TypeDoc programmatically, a function may be specified that will be called with the log message. By default, logs to the console. none may be passed to disable logging.",
//     "type": "boolean",
//     "oneOf": [
//       {
//         "type": "boolean"
//       },
//       {
//         "const": "none"
//       }
//     ],
//     "default": true
//   },
//   "logLevel": {
//     "description": "Specifies the log level to be printed to the console. Defaults to Info.",
//     "type": "string",
//     "enum": ["Verbose", "Info", "Warn", "Error"],
//     "default": "Info"
//   },
//   "skipErrorChecking": {
//     "description": "Instructs TypeDoc to not run the type checker before converting a project. Enabling this option may improve generation time, but could also result in crashes if your code contains type errors.",
//     "type": "boolean"
//   },
//   "validation": {
//     "description": "Specifies validation steps TypeDoc should perform on your generated documentation.",
//     "type": "object",
//     "properties": {
//       "notExported": {
//         "type": "boolean"
//       },
//       "invalidLink": {
//         "type": "boolean"
//       },
//       "notDocumented": {
//         "type": "boolean"
//       }
//     }
//   },
//   "treatWarningsAsErrors": {
//     "description": "Causes TypeDoc to treat any reported warnings as fatal errors that can prevent documentation from being generated.",
//     "type": "boolean"
//   },
//   "intentionallyNotExported": {
//     "description": "Lists symbols which are intentionally excluded from the documentation output and should not produce warnings. Entries may optionally specify a file name before a colon to only suppress warnings for symbols declared in a specific file.",
//     "type": "array",
//     "items": {
//       "type": "string"
//     }
//   },
//   "requiredToBeDocumented": {
//     "description": "Set the list of reflection types that must be documented, used by validation.notDocumented",
//     "type": "array",
//     "items": {
//       "type": "string"
//     }
//   },
// }
