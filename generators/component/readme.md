## About the component sub generator

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
