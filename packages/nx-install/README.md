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
  <a href="https://github.com/enio-ireland/enio/tree/develop/packages/nx-install">nx-install</a> is plugin for <a href="https://nx.dev">Nx workspaces</a> to quickly setup a custom install command on your projects. This is really convenient, especially when attempting to run operations on multiple projects dynamically, like running build and test on affected projects, where installing projects dependencies beforehand is a prerequisite. It is created, maintained, and released as open source under MIT license by a group of passionate individuals in <a href="https://github.com/enio-ireland/enio">Enio</a>.
</p>

<br>
<br>

## Getting Started

1. Add the plugin to your Nx workspace:

```shell script
npm install --save-dev @enio.ai/nx-install
```

1. Run the following command at the root directory of your workspace. If `nx` is not setup globaly, you may want to add it as npm script first (see details below) or prefix with `npx` when using [npm](https://npmjs.com). You can also run this command from the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension for [VSCode](https://code.visualstudio.com).

```shell script
  nx g @enio.ai/nx-install
```

<!-- <p align="center">
  <img src="https://github.com/enio-ireland/enio/blob/develop/images/nx-install-setup-demo.gif?raw=true">
</p> -->

<br>

## Install Dependencies from Nx

Run the following command:

```shell script
  npx nx run nx-install
```

Optionally, you can create an npm script on the `package.json` file in the root folder of your nx workspace for convenience.

```json
{
  "scripts": {
    "nx-install": "nx affected --target=nx-install --all",
    "setup.nx-install": "nx g @enio.ai/nx-install"
  }
}
```

Then you could run commands:

```shell script
  // Installing Dependencies for all affected projects
  npm run nx-install

  // Setting up nx-install
  npm run setup.nx-install
```

<!-- <p align="center">
  <img src="https://github.com/enio-ireland/enio/blob/develop/images/nx-install-exec-demo.gif?raw=true">
</p> -->

<br>

## [Contributors](https://github.com/enio-ireland/enio/blob/develop/CONTRIBUTORS.md)

<br>

## Sponsors

<p style="text-align: justify">
  Maintenance of this project is made possible by all the contributors and sponsors. If you'd like to sponsor this project and have your avatar or company logo appear below <a href="https://github.com/sponsors/enio-ireland">click here</a>. 💖
</p>

(This list will be automatically generated in the future.)