<br>

<!-- <p align="center">
  <img width="197" src="https://github.com/enio-ireland/enio/blob/develop/images/nx-install-nx-plugin.png?raw=true">
</p> -->

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/@enio.ai/nx-install?style=flat-square">
  <img alt="NPM" src="https://img.shields.io/npm/l/@enio.ai/nx-install?style=flat-square">
  <img alt="npm" src="https://img.shields.io/npm/dm/@enio.ai/nx-install?style=flat-square">
  <img alt="GitHub contributors (via allcontributors.org)" src="https://img.shields.io/github/all-contributors/enio-ireland/enio/develop?color=%23&style=flat-square">
  <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/enio-ireland?style=flat-square">
</p>

<p align="center">
  <a href="https://github.com/enio-ireland/enio/tree/develop/packages/nx-install">nx-install</a> is plugin for <a href="https://nx.dev">Nx workspaces</a> to quickly setup a custom install command on your projects. This is especially convenient for running operations on multiple projects dynamically, like running build and test on affected projects, where installing dependencies beforehand is a prerequisite. It is created, maintained, and released as open source under MIT license by a group of passionate individuals in <a href="https://github.com/enio-ireland/enio">Enio</a>.
</p>

<br>
<br>

## Getting Started

Add the plugin to your Nx workspace:

```shell script
npm install --save-dev @enio.ai/nx-install
```

Run the following command at the root directory of your workspace. If `nx` is not setup globaly, you may want to add it as npm script first (see details below) or prefix with `npx` when using [npm](https://npmjs.com). You can also run this command from the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension for [VSCode](https://code.visualstudio.com).

```shell script
  nx g @enio.ai/nx-install
```

> Note: [nx-install](https://github.com/enio-ireland/enio/tree/develop/packages/nx-install) has a policy to update depedencies regularly. When running into issues with conflicting dependencies using npm for example, there are options to resolve those version conflicts. See [overrides](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides) for npm.

## Installing Dependencies with nx-install

The previous command will have installed two new scripts in your root workspace package.json.

```json
{
  "scripts": {
    "nx-install": "nx nx-install",
    "nx-install:affected": "nx affected --target=nx-install --all"
  }
}
```

Then you could run the following commands, where `<project>` is the name of the project in the nx workspace you want to run it for.

```shell script
  // Installing dependencies for target project
  npm run nx-install <project>


  // Installing dependencies for all affected projects
  npm run nx-install:affected
```

<br>

## [Contributors](https://github.com/enio-ireland/enio/blob/develop/CONTRIBUTORS.md)

<br>

## Sponsors

<p style="text-align: justify">
  Maintenance of this project is made possible by all the contributors and sponsors. If you'd like to sponsor this project and have your avatar or company logo appear below <a href="https://github.com/sponsors/enio-ireland">click here</a>. 💖
</p>

(This list will be automatically generated in the future.)
