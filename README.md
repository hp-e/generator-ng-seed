# A [Yeoman](http://yeoman.io) generator for scaffolding an Angular project with Typescript and webpack.
The goal of this generator is to create a very simple scaffolding for an Angular project.

Given the 6 month main release schedule for Angular we will try to mirror that in this generator.
e.g. When Angular 3 is in production you will be able to select either 2 or 3 as the basis for your application. 

NB! Version 1 of Angular is not and will not be supported in this generator.

## Getting Started

First of all you will need the yeoman cli for this generator. If you don't have it installed do that now.

```cmd 
$ npm install -g yo
```

### Run the generator

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

to skip all questions and only create the minimum files required to run a simple angular2 project
```cmd
$ yo ng-seed --easy-peasy
```

## File structure
The generator produce the following output. This structure is loosly based on the angular2-seed from the angular team.

```
generator-ng-seed/
 ├──config/                       
 |   ├──prod.config.js                     
 ├──src/                       
 |   ├──main.browser.ts                     //this is the starting point for the application
 │   │
 |   ├──index.html                          //
 |   ├──favicon.ico             
 │   │
 |   ├──polyfills.browser.ts                //
 |   ├──vendor.browser.ts                   // third pary libraries can be imported to this file
 │   │
 │   ├──app/                   
 │   │   ├──core/  
 │   │   │   └──rxjs-extensions.ts          
 │   │   ├──home/        
 │   │   │   ├──home.component.css          
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
 │       └──styles.css                      
 │
 ├──.gitignore             
 ├──.yo.rc.json             
 ├──CHANGELOG.md            
 ├──README.md             
 │
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
 │   │   ├──company/                             
 │   │   │   ├──components/                      
 │   │   │   │   ├──company.component.html       
 │   │   │   │   └──company.component.ts         
 │   │   │   ├──models/                          
 │   │   │   │   └──company.model.ts             
 │   │   │   ├──pages/                           
 │   │   │   │   ├──company.component.html       
 │   │   │   │   └──company.component.ts         
 │   │   │   ├──company.module.ts                
 │   │   │   ├──company.routing.module.ts        
 │   │   │   ├──company.service.ts               
 │   │   │   ├──company.pages.ts                 
 │   │   │   ├──company.models.ts               
 │   │   │   └──company.components.ts            
```

using a name like companyManager will look like this 
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
### Page
To run the page sub generator:
```
$ yo ng-seed:page 
```
1. Select the module/directory where the page(s) should be created 
2. Enter the page name(s). 

For each page name the following will be generated in the selected module pages directory:
```
selected module = company
PageName = companyDetail

generator-ng-seed/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──company/                            
 │   │   │   ├──pages/                     
 │   │   │   │   ├──company-detail.page.html      
 │   │   │   │   ├──company-detail.page.css       
 │   │   │   │   └──company-detail.page.ts        
 
```

to only create the page file using an inline style add the --inline option
```
$ yo ng-seed:page --inline
```

### Component

To run the component sub generator:
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
 │   │   ├──company/                                    
 │   │   │   ├──components/                             
 │   │   │   │   ├──company-list.component.html         
 │   │   │   │   ├──company-list.component.css          
 │   │   │   │   └──company-list.component.ts           
 
```

to only create the component file and using an inline style add --inline option
```
$ yo ng-seed:component --inline
```



## License

MIT