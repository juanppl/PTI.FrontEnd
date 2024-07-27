## Overview

https://raw.githubusercontent.com/juanppl/PTI.FrontEnd/src/assets/overview.png

#### <i>Prerequisites</i>

Before you begin, make sure your development environment includes `Node.js®` and an `npm` package manager.

###### Node.js

[**Angular 18**](https://angular.io/guide/what-is-angular) requires `Node.js` LTS version `^18.19` or `^20.09`.

- To check your version, run `node -v` in a terminal/console window.
- To get `Node.js`, go to [nodejs.org](https://nodejs.org/).

###### Angular CLI

Install the Angular CLI globally using a terminal/console window.

```bash
npm install -g @angular/cli
```

### Installation

``` bash
$ npm install
$ npm update
```

### Basic usage

``` bash
# dev server with hot reload at http://localhost:4200
$ npm start
```

Navigate to [http://localhost:4200](http://localhost:4200). The app will automatically reload if you change any of the source files.

#### Build

Run `build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
# build for production with minification
$ npm run build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations.
You'll see something like this:

```
coreui-free-angular-admin-template
├── src/                         # project root
│   ├── app/                     # main app directory
|   │   ├── icons/               # icons set for the app
|   │   ├── layout/              # layout 
|   |   │   └── default-layout/  # layout components
|   |   |       └── _nav.js      # sidebar navigation config
|   │   └── views/               # application views
│   ├── assets/                  # images, icons, etc.
│   ├── components/              # components for demo only
│   ├── scss/                    # scss styles
│   └── index.html               # html template
│
├── angular.json
├── README.md
└── package.json
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end
testing capabilities.

## Creators

**Łukasz Holeczek**

* <https://twitter.com/lukaszholeczek>
* <https://github.com/mrholek>
* <https://github.com/coreui>

**CoreUI team**

* https://github.com/orgs/coreui/people

## Community

Get updates on CoreUI's development and chat with the project maintainers and community members.

- Follow [@core_ui on Twitter](https://twitter.com/core_ui).
- Read and subscribe to [CoreUI Blog](https://coreui.io/blog/).

## Copyright and License

copyright 2024 creativeLabs Łukasz Holeczek.

Code released under [the MIT license](https://github.com/coreui/coreui-free-react-admin-template/blob/master/LICENSE).
There is only one limitation you can't re-distribute the CoreUI as stock. You can’t do this if you modify the CoreUI. In the past, we faced some problems with
persons who tried to sell CoreUI based templates.
