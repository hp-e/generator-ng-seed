## About the page sub generator

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
