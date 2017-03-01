# Info about 

A small and simple application using Angular, TypeScript 2 and Webpack 2
This project has been created with help of the Yeoman generator-ng-seed (```yo ng-seed```).

## Getting started

It's recommended that Windows users install Webpack, TypeScript and Webpack-dev-server globally before starting the server.

```
npm install -g typescript webpack-dev-server webpack
```

If not done already run ```npm install``` to install all dependencies.

then run ```npm start``` to fire up the dev server.

Finally, open browser to http://localhost:<% port %>

***if you want to use a different port, open package.json file, then change port in --port 3000 script***

## Using the ng-seed generator to expand the project
The ng-seed generator provides a set of sub generators to create code.
The sub generator works on any angular project even if it was not initialized with ng-seed.

### Default settings
All settings is stored in the ng-seed.json file in the root of the application (along with the package.json)
* Using src/app as the root folder as base for code creation
* Structure files according to type (Components is created inside a components folder, services in a services folder)
* Adds a postfix to the file name and class name based on the type of object (e.g a Component for a table will be named table.component.ts and TableComponent as classname)
* Adds the item to a barrel- file located in the root of the module or the path you've requested to add files to

### MODULE sub- generator
Generates a @ngModule file

```yo ng-seed:module [path/]<moduleName> [--p] [--s] [--c] [--d] [--m] [--pipe] [--structure-flat | --structure-self | structure-ask ] [--tpl] [--scss | --css ] [--no-barrel] [--tpl]```

*Example without a sub folder*
```
yo ng-seed:module CompanyManager
```

*Example with a sub folder*
This will create the module in the 
```
yo ng-seed:module content/CompanyManager
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

## Using a NPM project with other developers
Consider to use ```npm shrinkwrap --dev``` to lock down the versions in the package.json. This will force all developers on the project to use the same versions and 

Any NPM project, using code that releis heavy on npm 
and using tilde or uparrow in front of the versions in the package.json file might give some issues.
This generator cannot 