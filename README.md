[Yeoman](http://yeoman.io) generator for angular with typescript projects.

## Getting Started

### Get to know Yeoman.

He's a cool guy. He wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Run the generator

To install generator-ng-seed from npm, run:

```
$ npm install -g generator-ng-seed
```

Finally, initiate the generator and download packages in one go:
```
$ yo ng-seed
```

or to download packages later
```
$ yo ng-seed --skip-install
```

to skip all questions and only create the minimum files required to run a simple angular2 project
or to download packages later
```
$ yo ng-seed --easy-peasy
```

Tell it what to name your project, libraries to include and frontend framework to use. 

## File structure

```
generator-ng-seed/
 ├──src/                       * our source files that will be compiled to javascript
 |   ├──main.ts                * our entry file for our browser environment
 │   │
 |   ├──index.html             * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts           * our polyfills file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   ├──app.spec.ts        * a simple test of components in app.ts
 │   │   ├──app.e2e.ts        * a simple end-to-end test for /
 │   │   └──app.ts             * App.ts: a simple version of our App component components
 │   │
 │   └──assets/                * static assets are served here
 │       ├──icon/              * our list of icons from www.favicon-generator.org
 │       ├──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt         * for search engines to crawl your website
 │       └──human.txt          * for humans to know who the developers are
 │
 ├──spec-bundle.js             * ignore this magic that sets up our angular 2 testing environment
 ├──karma.config.js            * karma config for our unit tests
 ├──protractor.config.js       * protractor config for our end-to-end tests
 │
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──typings.json               * our typings manager
 ├──package.json               * what npm uses to manage it's dependencies
 │
 ├──webpack.config.js          * our development webpack config
 ├──webpack.test.config.js     * our testing webpack config
 └──webpack.prod.config.js     * our production webpack config
```

### Enjoy!

This generator comes with Webpack with tasks for compiling and running.

To build and run the project:
 
```
$ npm start
```

To build only:

```
$ npm run build
```

## Sub generators

### Page

### Component
In this sub generator a module is a directory in the src/app directory. It consists of a <name>.module.ts, router, pages, components.
You will be asked for a name for the module. This should be written in singular form (e.g company not companies). Where appropriate we 
will fint the plural form. Separate word with upper case (companyManager, companyContact etc)

To run the module sub generator:
```
$ yo ng-seed:component 
```
1. Select the module/directory where the component(s) should be created 
2. Enter the component name(s). 

For each component name the following will be generated in the selected module components directory:
```
selected module = company
componentName = companyList

generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──company/                             * a simple test of components in app.ts
 │   │   │   ├──components/                * a simple end-to-end test for /
 │   │   │   │   ├──company-list.component.html                * a simple end-to-end test for /
 │   │   │   │   ├──company-list.component.css                * a simple end-to-end test for /
 │   │   │   │   └──company-list.component.ts                * a simple end-to-end test for /
 
```

to only create the component file and using an inline style add --inline option
```
$ yo ng-seed:component --inline
```

### Module
In this sub generator a module is a directory in the src/app directory. It consists of a <name>.module.ts, router, pages, components.
You will be asked for a name for the module. This should be written in singular form (e.g company not companies). Where appropriate we 
will fint the plural form. Separate word with upper case (companyManager, companyContact etc)

To run the module sub generator:
```
$ yo ng-seed:module 
```

When asked for class name you can enter more than one module name. Each module must be separated by a SPACE

#### File structure for the module
```
moduleName = company
generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──company/                             * a simple test of components in app.ts
 │   │   │   ├──components/                * a simple end-to-end test for /
 │   │   │   │   ├──company.component.html                * a simple end-to-end test for /
 │   │   │   │   └──company.component.ts                * a simple end-to-end test for /
 │   │   │   ├──models/                * a simple end-to-end test for /
 │   │   │   │   └──company.model.ts                * a simple end-to-end test for /
 │   │   │   ├──pages/                * a simple end-to-end test for /
 │   │   │   │   ├──company.component.html                * a simple end-to-end test for /
 │   │   │   │   └──company.component.ts                * a simple end-to-end test for /
 │   │   │   ├──company.module.ts                * a simple end-to-end test for /
 │   │   │   ├──company.routing.module.ts        * a simple end-to-end test for /
 │   │   │   ├──company.service.ts        * a simple end-to-end test for /
 │   │   │   ├──company.pages.ts        * a simple end-to-end test for /
 │   │   │   ├──company.models.ts        * a simple end-to-end test for /
 │   │   │   └──company.components.ts        * a simple end-to-end test for /
```

A combined name like companyManager will look like this 
```
moduleName = companyManager
generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──company-manager/                             
 │   │   │   ├──components/                
 │   │   │   │   ├──company-manager.component.html               
 │   │   │   │   └──company-manager.component.ts                
 │   │   │   ├──models/               
 │   │   │   │   └──company-manager.model.ts                
 │   │   │   ├──pages/                
 │   │   │   │   ├──company-manager.component.html  
 │   │   │   │   └──company-manager.component.ts    
 │   │   │   ├──company-manager.module.ts          
 │   │   │   ├──company-manager.routing.module.ts  
 │   │   │   ├──company-manager.service.ts        
 │   │   │   ├──company-manager.pages.ts        
 │   │   │   ├──company-manager.models.ts        
 │   │   │   └──company-manager.components.ts      
```

## License

MIT