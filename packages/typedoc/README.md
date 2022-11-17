<br>

<p align="center">
  <img width="197" src="https://github.com/enio-ireland/enio/blob/develop/images/typedoc-nx-plugin.png?raw=true">
</p>

<p align="center">
  <a href="https://github.com/enio-ireland/enio/tree/develop/packages/typedoc">typedoc</a> is a wrapper plugin for <a href="https://nx.dev">Nx workspaces</a> to quickly setup documentation automation on your projects using <a href="https://www.npmjs.com/package/typedoc">typedoc</a>. It is created, maintained, and released as open source under MIT license by a group of passionate individuals in <a href="https://github.com/enio-ireland/enio">Enio</a>.
</p>

<br>
<br>

## Install, and run it!

> If you aren't familiar with typedoc, saying that typedoc is convenient is an understatement. If you are using TypeScript correctly, assigning types and interfaces, and commenting on what your code does - you can generate documentation on a static site.
> 
> Kudos to the author(s) and maintainer(s) of this [brilliant library](https://typedoc.org). We created this Nx wrapper plugin to solve our problem -maintaining several open-source projects is not easy, and certainly, any automation to make the code base maintainable is most welcomed.

Check out this quick demo on how to setup typedoc via this plugin and use it:

<p align="center">
  <img src="https://github.com/enio-ireland/enio/blob/develop/images/typedoc-demo.gif?raw=true">
</p>

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
{
  // package.json
  "scripts": {
    // ...
    "create.docs": "nx typedoc",
    "setup.docs": "nx g @enio.ai/typedoc:config"
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

<br>

## Contributors

(This list will be automatically generated in the future.)

<br>

## Sponsors

<p style="text-align: justify">
  Maintenance of this project is made possible by all the contributors and sponsors. If you'd like to sponsor this project and have your avatar or company logo appear below <a href="https://github.com/sponsors/enio-ireland">click here</a>. 💖
</p>

(This list will be automatically generated in the future.)
