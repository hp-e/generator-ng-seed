# A [Yeoman](http://yeoman.io) generator for scaffolding an Angular project with Typescript and webpack.
The goal of this generator is to provide a very simple scaffolding tool for an Angular project.

**Supported Angular versions:**
* Angular 2.4.8
* Angular 4.0.0-rc.1

NB! Version 1 of Angular is not and will not be supported in this generator.

## Getting Started

First of all you will need the yeoman cli for this generator. If you don't have it installed do that now.

```cmd 
$ npm install -g yo
```

### Run the generator

```yo ng-seed [--q] [--structure-flat | --structure-self | --structure-ask] [--css] [--no-barrel] [--no-linting] [--no-bundler] ```

To install this generator from npm, run:

```cmd
$ npm install -g generator-ng-seed
```

Finally, initiate the generator:
```cmd
$ yo ng-seed
```

or to download dependencies later
```cmd
$ yo ng-seed --skip-install
```

or to skip all questions and only create the minimum files required to run a simple angular2 project
```cmd
$ yo ng-seed --q
```

#### Options
|Option ||Description|
| -|-|-|
| --q|optional|q for quick start. If all you want is a basic structure. This will scaffold the files with all default settings|
| --structure-flat|optional|Changes the itemFolderStructure to flat. The subgenerators will place all created files at the root of the selected folder|
| --structure-self|optional|Changes the itemFolderStructure to self. The subgenerators will place all created files with the items name and place the item in this folder. Overrides the default setting |
| --structure-ask|optional|Changes the itemFolderStructure to ask. The subgenerators will ask where to place the files |
| --css|optional|Changes the defaultStyle to css (default is scss) |
| --no-barrel|optional|Changes the module.useBarrelFile to false and will not write items to the barrel file |
| --no-linting|optional|Will not add the linting.json settings file to the root |
| --no-bundler|optional|Will not install webpack or any file needed for the webpack. |


## File structure
The generator produce the following output. This structure is loosly based on the angular2-seed from the angular team.

```
generator-ng-seed/
 ├──config/                       
 |   ├──prod.config.js                     
 ├──src/                       
 │   ├──main.ts                     //this is the starting point for the application
 │   │
 │   ├──index.html                          
 │   ├──favicon.ico             
 │   │
 │   ├──polyfills.ts                
 │   ├──vendor.ts                   // third pary libraries can be imported to this file
 │   │
 │   ├──app/                   
 │   │   ├──core/  
 │   │   │   └──rxjs-extensions.ts          
 │   │   ├──home/        
 │   │   │   ├──home.component.scss          
 │   │   │   ├──home.component.html        
 │   │   │   └──home.component.ts          
 │   │   ├──shared/        
 │   │   │   page-not-found.ts          
 │   │   ├──app.component.html        
 │   │   ├──app.component.ts        
 │   │   ├──app.module.ts        
 │   │   ├──app.routes.ts        
 │   │   └──app.settings.ts             
 │   │
 │   └──assets/                      
 │       └──styles.scss                      
 │
 ├──.gitignore             
 ├──.yo.rc.json             
 ├──CHANGELOG.md            
 ├──README.md             
 │──ng-seed.json                          
 ├──tsconfig.json                          
 ├──package.json                
 └──webpack.config.js     
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

The ng-seed generator also provides a set of sub generators to speed up your 
development with Angular, TypeScript and WebPack

* module  
* page  
* component  
* model  
* model  
* service  
* directive  
* pipe  
* version  

### Module
In this sub generator a module is a directory in the src/app directory. It consists of a <name>.module.ts, router, pages, components.
You will be asked for a name for the module. This should be written in singular form (e.g company not companies). Where appropriate we 
will fint the plural form. Separate word with upper case (companyManager, companyContact etc)

```yo ng-seed:module [path/]<moduleName> [--p] [--s] [--c] [--d] [--m] [--pipe] [--structure-flat | --structure-self | structure-ask ] [--tpl] [--scss | --css ] [--no-barrel] [--tpl]```

To run the module sub generator:
```
$ yo ng-seed:module moduleName
```

#### Options
|Option ||Description|
| -|-|-|
| folder|optional|If you need to put the module in a different folder from src/app then you can add the foldername here. Must be a part of the moduleName and finish with / (foreword slash)|
| moduleName|**required**|The moduleName cannot be separated with SPACE. Use PascalCase for the module name |
| --c|optional|Adds a set of pages to the module. You wil be asked about the component name. |
| --p|optional|Adds a set of pages to the module. You wil be asked about the page name. |
| --m|optional|Adds a set of pages to the module. You wil be asked about the model name. |
| --s|optional|Adds a set of pages to the module. You wil be asked about the service name. |
| --d|optional|Adds a set of pages to the module. You wil be asked about the directive name. |
| --pipe|optional|Adds a set of pipes to the module. You wil be asked about the page name. |
| --lazy|optional|Uses the CommonModule instead of BrowserModule so that it could be lazy loaded |
| --structure-flat|optional|Adds the items to the same folder as the module. Overrides the default setting |
| --structure-self|optional|Creates a folder with the items name and place the item in this folder. Overrides the default setting |
| --structure-ask|optional|You will be asked where to place the items. Overrides the default setting |
| --tpl|optional|Adds a template file to the component or page. Overrides the default setting |
| --scss|optional|Adds a scss style page for each item (component or page). Overrides the default setting |
| --css|optional|Adds a css style page for each item (component or page). Overrides the default setting |
| --no-barrel|optional|Will not write the items to the barrel file, Overrides the default settings |

### COMPONENT sub- generator

Creates a set of components
```yo ng-seed:component <pathToModule> [--tpl] [--scss | --css ] [--structure-flat | --structure-self | structure-ask ] [--no-barrel]```

### PAGE sub- generator
Creates a set of pages.
What is a page? A page is still a component, but I think of a page as an endpoint for a route, a landing component that holds a set of components.

Example: http://localhost:3000/departments would point to a index.page.ts and inside the template I would call other components.

```yo ng-seed:page <pathToModule> [--tpl] [--scss | --css ] [--structure-flat | --structure-self | structure-ask ] [--no-barrel]```

### MODEL sub- generator
Creates a set of models and adds it to the module.

```yo ng-seed:model <pathToModule> [--structure-flat | --structure-self | structure-ask ] [--no-barrel]```

### SERVICE sub- generator
Creates a set of services and adds it to the module.

```yo ng-seed:service <pathToModule> [--structure-flat | --structure-self | structure-ask ]```

### DIRECTIVE sub- generator
Creates a set of directives and adds it to the module.

```yo ng-seed:directive <pathToModule> [--structure-flat | --structure-self | structure-ask ] [--no-barrel]```

### PIPE sub- generator
Creates a set of directives and adds it to the module.

```yo ng-seed:pipe <pathToModule> [--structure-flat | --structure-self | structure-ask ] [--no-barrel]```


## Samples

### I want to create a simple module 
```
yo ng-seed:module CompanyManager
```
the above sample will produce the following:
```
moduleName = CompanyManager
generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──company-manager/                             
 │   │   │   ├──company-manager.module.ts                
 │   │   │   └──company-manager.routing.module.ts                           
```

### I want to create a simple module 
This will create the module inside the content sub directory
```
yo ng-seed:module content/CompanyManager
```

the above sample will produce the following:
```
moduleName = CompanyManager
generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──content/                             
 │   │   │   ├──company-manager/                             
 │   │   │   │   ├──company-manager.module.ts                
 │   │   │   │   └──company-manager.routing.module.ts                           
```

### I want to create a module with a set of components, service and model

To create a module named admin, ready to be lazy loaded and adding a component, service and a couple of models together with the module:
```
yo ng-seed:module CompanyManager --c --s --m --lazy
```

You will now be asked some questions:
```
? What is the component name(s) (separate components with SPACE)? tabel chart
? What is the model name(s) (separate models with SPACE)? manager
? What is the service name(s) (separate services with SPACE)? admin
```

the above sample will produce the following:
```
moduleName = CompanyManager
generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──company-manager/                             
 │   │   │   ├──components/                      
 │   │   │   │   ├──chart.component.html       
 │   │   │   │   ├──chart.component.ts       
 │   │   │   │   ├──table.component.html       
 │   │   │   │   └──table.component.ts         
 │   │   │   ├──models/                          
 │   │   │   │   └──manager.model.ts             
 │   │   │   ├──services/                                
 │   │   │   │   └──admin.servcice.ts         
 │   │   │   ├──company-manager.module.ts                
 │   │   │   ├──company-manager.routing.module.ts                     
 │   │   │   └──company-manager.exports.ts            
```

**What if I want to place all items in the same sub directory?**

You can add --structure-ask to the above example, then you will be asked to provide a name for the directory:

```
? Please provide a name for the sub-directory to place the item in? myItems
```

Now the structure would look like this
```
moduleName = admin
generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──company-manager/                             
 │   │   │   ├──my-items/                      
 │   │   │   │   ├──chart.component.html       
 │   │   │   │   ├──chart.component.ts       
 │   │   │   │   ├──table.component.html       
 │   │   │   │   ├──table.component.ts                                  
 │   │   │   │   ├──manager.model.ts                                            
 │   │   │   │   └──admin.servcice.ts         
 │   │   │   ├──company-manager.module.ts                
 │   │   │   ├──company-manager.routing.module.ts                     
 │   │   │   └──company-manager.exports.ts            
```

**What if I want to place all items module root folder?**

You can replace **--structure-ask** with **--structure-flat** 

Now the structure would look like this
```
moduleName = admin
generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──company-manager/                                             
 │   │   │   ├──chart.component.html       
 │   │   │   ├──chart.component.ts       
 │   │   │   ├──table.component.html       
 │   │   │   ├──table.component.ts                                  
 │   │   │   ├──manager.model.ts                                            
 │   │   │   ├──company-manager.servcice.ts         
 │   │   │   ├──company-manager.module.ts                
 │   │   │   ├──company-manager.routing.module.ts                     
 │   │   │   └──company-manager.exports.ts            
```

## License

MIT