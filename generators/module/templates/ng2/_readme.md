# Using the <%= className %> module

This 'module' is a sub folder in your project. It provide it's own routing, components, service etc
and is ready to use in the application

## How to implement to main module 
To import the code for the module and then use it in this project you need to 
import the module in the src/app.module.ts 

1. Open the src/app.module.ts
2. in the top section where all the imports are enter (or copy this string): import { <%= className %>Module } from './<%= pageName %>/<%= pageName %>.module';
3. Then, in the @ngModule annotation and the 'imports' array, add the <%= className %>Module. It should be added before the AppRoutingModule.

somthing like this...

```typescript
@NgModule({
  declarations: [
    AppComponent,  
    HomeComponent,
    PageNotFound,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,   

    // enter the module here:         
    <%= className %>Module, 
    // before this...
    AppRoutingModule
  ],
  providers: [   
    AppSettings, 
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
```

That's it. try it out with
```cmd
npm start
```
to compile and start the project.

then go to your http://localhost:<%= port %>/<%= classNamePluralLower %>

NB: the above url will only work if you have'nt changed the routes in the <%= pageName %>.routing.module.ts

## File structure for the module
```
moduleName = <%= className %>
root/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──<%= classNameLower %>/                             
 │   │   │   ├──components/                      
 │   │   │   │   ├──<%= pageName %>.component.css       
 │   │   │   │   ├──<%= pageName %>.component.html       
 │   │   │   │   └──<%= pageName %>.component.ts         
 │   │   │   ├──models/                          
 │   │   │   │   └──<%= pageName %>.model.ts             
 │   │   │   ├──pages/                           
 │   │   │   │   ├──<%= pageName %>.page.css       
 │   │   │   │   ├──<%= pageName %>.page.html       
 │   │   │   │   └──<%= pageName %>.page.ts         
 │   │   │   ├──<%= pageName %>.module.ts                
 │   │   │   ├──<%= pageName %>.routing.module.ts        
 │   │   │   ├──<%= pageName %>.service.ts               
 │   │   │   ├──<%= pageName %>.pages.ts                 
 │   │   │   ├──<%= pageName %>.models.ts               
 │   │   │   └──<%= pageName %>.components.ts            
```

## File explanations

### <%= pageName %>.module.ts
### <%= pageName %>.routing.module.ts
### <%= pageName %>.service.ts
### <%= pageName %>.pages.ts
### <%= pageName %>.models.ts

### <%= pageName %>.components.ts

You could (I wont use should) place all your components in the folder/directory. 
This will add a good structure and as your project grows it will make it easier to locate file.

Optionally you can also add an export * from './components/<%= pageName %>..component';
That will make it easy to import your component in a module or any other place you need
to import the component.

e.g in the module file you import the <%= pageName %>.components and not each individual component.

### components directory

#### component file.
According to the Angular 2 style guide you should place each component in their own file. I fully support this
It will give you a better structure and it will be easy to find the class you are looking for.

Use an export statement in the *.components.ts file in the root of the module folder/directory to combine 
all the components into a single file.

### model file

### pages directory