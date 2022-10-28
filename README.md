

# Enio

<p style="align: center">
  <img src="https://github.com/enio-ireland/enio/blob/develop/images/enio.png?raw=true">
  <br />
  <br />
  A hub for great inventions built by [Enio](https://github.com/enio-ireland).
</p>

---

## About Enio

This project was generated using [Nx](https://nx.dev).

---

## Create an application

| Description | Command |
| :-- | :-- |
| Create a frontend application with [Next](https://nextjs.org) | `npm run create.app.next` |
| Create a frontend application with [React](https://reactjs.org) | `npm run create.app.react` |
| Create server-side application with [Nest](https://nestjs.com/)  | `npm run create.app.nest` |

---

## Create a library

| Description | Command |
| :-- | :-- |
| Create a [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) library using [Typescript](https://www.typescriptlang.org/). See [options](). | `npm run create.lib.ts` |
| Create a UI component library with [React](https://reactjs.org). See [options]().  | `npm run create.lib.react` |
| Create server-side library with [Nest](https://nestjs.com/).  See [options]().  | `npm run create.lib.nest` |
| Create a UI component library with [Next](https://nextjs.org). See [options]().  | `npm run create.lib.next` |

> You should specify the following flags `--buildable` and/or `--publishable` when building new libraries. See [docs](https://nx.dev/more-concepts/buildable-and-publishable-libraries).

> Libraries are shareable across libraries and applications. They can be imported from `@enio/mylib`.

---

## Setup documentation automation

Run `npm run create.docs` followed by the name of your project. This will automatically collect details of your project
to produce technical documentation. See [documentation](https://www.npmjs.com/package/@twittwer/compodoc).

---

## Setup a delovepment environment

Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components. Run `npm run create.book`  followed by the name of your project. See [documentation](https://nx.dev/packages/storybook).

Run `npm run serve.book` to build the environment to showcase the UI components in memory and serve it to a particular port for local development.

Run `npm run build.book` to built a static site to demo and possibly deploy publicly to showcase the UI components in the frontend library.

---

## Development server

Run `npm run serve` followed by the name of your application for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

---

## Code scaffolding

Generators are typically command line tools that runs some scripts to generate boilerplate code.

Take for example [React generators](https://nx.dev/packages/react#generators). You can run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

See full generators directory.

+ [React](https://nx.dev/packages/react#generators)
+ [Next](https://nx.dev/packages/next#generators)
+ [Nest](https://nx.dev/packages/nest#generators)

## Build

Run `npm run build` followed by the name of the project to build it. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` followed by the name of the project to run unit tests for it. Execute the unit tests via [Jest](https://jestjs.io).

Run `npm run test:affected` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `npm run e2e` followed by the name of the project to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npm run e2e:affected` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `npm run graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
