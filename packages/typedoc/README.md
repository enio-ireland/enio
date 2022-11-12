<br>

<p align="center">
  <img width="197" src="https://github.com/enio-ireland/enio/blob/develop/images/enio.png?raw=true">
</p>

<p align="center">
  <a href="https://github.com/enio-ireland/enio/tree/develop/packages/typedoc">typedoc</a> is a transparent wrapper plugin for <a href="https://nx.dev">Nx workspaces</a> to quickly setup documentation automation on your projects using <a href="https://www.npmjs.com/package/typedoc">typedoc</a>. It is created, maintained, and released as open source under MIT license by a group of passionate individuals in <a href="https://github.com/enio-ireland/enio">Enio</a>.
</p>

<br>
<br>

## Getting Started

1. Add the plugin to your Nx workspace:

```shell script
npm install --save-dev @enio.ai/typedoc
```

2. Run the following command at the root directory of your workspace, where `<project>` is the name of the project in the nx workspace you want to set up. If `nx` is not setup globaly, you may want to add it as npm script first (see details below) or prefix with `npx` when using [npm](https://npmjs.com). You can also run this command from the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension for [VSCode](https://code.visualstudio.com).

```shell script
  nx g @enio.ai/typedoc:config <project>
```

<br>

## Generating Docs

Run the following command, where `<project>` is the name of your project in the nx workspace.

```shell script
  npx nx run <project>:typedoc
```

Optionally, you can create an npm script on the `package.json` file in the root folder of your nx workspace for convenience.

```json
{ // package.json
  "scripts": {
    // ...
    "create.docs": "nx @enio.ai/typedoc:typedoc",
    "setup.docs": "nx g @enio.ai/typedoc:config",
    // ...
  }
}
```

Then you could run commands:

```shell script
  // Generating documentation
  npm run create.docs <project>

  // Setting up typedoc in your project
  npm run setup.docs <project>
```

By default, the documents are generated under: `./docs` relative to root directory of the workspace.

<br>

## Configure Docs

This plugin includes sensible default configurations for best experience. 
If you wish to further customize typedoc behavior in your Nx project you can;

1. Update `typedoc.json` file in your project directory.
2. Update typedoc entry options in `nx.json` to apply consistent behavior when running the generate documentation command for your Nx projects.
