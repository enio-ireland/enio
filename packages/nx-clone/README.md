<br>

<p align="center">
  <img width="197" src="https://github.com/enio-ireland/enio/blob/develop/images/nx-clone.png?raw=true">
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/@enio.ai/nx-clone?style=flat-square">
  <img alt="NPM" src="https://img.shields.io/npm/l/@enio.ai/nx-clone?style=flat-square">
  <img alt="npm" src="https://img.shields.io/npm/dm/@enio.ai/nx-clone?style=flat-square">
  <img alt="GitHub contributors (via allcontributors.org)" src="https://img.shields.io/github/all-contributors/enio-ireland/enio/develop?color=%23&style=flat-square">
  <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/enio-ireland?style=flat-square">
</p>

<p align="center">
  <a href="https://github.com/enio-ireland/enio/tree/develop/packages/nx-clone">nx-clone</a> is plugin for <a href="https://nx.dev">Nx workspaces</a> to instantly clone an existing project with a new name and location. Typically, Nx plugins get you started with a base project, but you end up customizing it make further to make it just right for you or your team. You can move your ideal "base" project into any top-level folder like "templates" within your Nx workspace and then use `nx-clone` to instantly create a new carbon-copy project on demand. This is especially convenient as it will cut your configuration time to almost zero when you need to spin up another project using the same pattern or approach. It is created, maintained, and released as open source under MIT license by a group of passionate individuals in <a href="https://github.com/enio-ireland/enio">Enio</a>.
</p>

<br>
<br>

## Getting Started

Add the plugin to your Nx workspace:

```shell script
npm install --save-dev @enio.ai/nx-clone
```

Run the following command at the root directory of your workspace. If `nx` is not setup globaly, you may want to add it as npm script first (see details below) or prefix with `npx` when using [npm](https://npmjs.com). You can also run this command from the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension for [VSCode](https://code.visualstudio.com).

## Cloning projects with nx-clone

Run the following command:

```shell script
  nx g @enio.ai/nx-clone:exec
```

Optionally, set up an npm script that invoke the same command for accessibility. Then simply run the `npm run clone` command.

```json
{
  "scripts": {
    "clone": "nx g @enio.ai/nx-clone:exec",
  }
}
```

<!-- <p align="center">
  <img src="https://github.com/enio-ireland/enio/blob/develop/images/nx-clone-exec-demo.gif?raw=true">
</p> -->

<br>

## [Contributors](https://github.com/enio-ireland/enio/blob/develop/CONTRIBUTORS.md)

<br>

## Sponsors

<p style="text-align: justify">
  Maintenance of this project is made possible by all the contributors and sponsors. If you'd like to sponsor this project and have your avatar or company logo appear below <a href="https://github.com/sponsors/enio-ireland">click here</a>. 💖
</p>

(This list will be automatically generated in the future.)
