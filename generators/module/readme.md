## About the module sub generator

In this sub generator a module is a directory in the src/app directory. It consists of a <name>.module.ts, router, pages, components.
You will be asked for a name for the module. This should be written in singular form (e.g company not companies). Where appropriate we 
will fint the plural form. Separate word with upper case (companyManager, companyContact etc)

To run the module sub generator:
```
$ yo ng-seed:module 
```

When asked for class name you can enter more than one module name. Each module must be separated by a SPACE

### File structure for the module
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