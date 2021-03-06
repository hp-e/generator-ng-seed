# Using the <%= className %> module

This 'module' is a sub folder in your project. It provide it's own routing, components, service etc
and is ready to use in the application

## How to implement to main module 
To import the code for the module and then use it in this project you need to 
import the module into the src/app.module.ts 

1. Open the src/app.module.ts
2. in the top section where all the imports are, enter (or copy this string): 

```typescript
import { <%= className %>Module } from './<%= singularKebabName %>/<%= fileName %>.module';
```

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

## How to lazy load the module 
To lazy load this module do the following

1. Open the src/app.routes.ts
2. locate the routes const: 

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},  
  { path: 'home', component: HomeComponent},  
  // enter this:
  { path: '<%= pluralLowerName %>', loadChildren: './<%= path %><%= singularKebabName %>/<%= singularKebabName %>.module#<%= className %>Module', pathMatch: 'full' },
  //----
  { path: '**', pathMatch: 'full', component: PageNotFound },
];

```

<% if (!lazyLoading) { %>
Make sure you import the CommonModule from @angular/common instead of the BrowserModule 
<% } %> 

## Common file structure for the module
```
moduleName = <%= className %>
root/
 ├──src/                       
 │   ├──app/                   
 │   │   ├──<%= classNameLower %>/                             
 │   │   │   ├──components/                      
 │   │   │   │   ├──<%= fileName %>.component.css       
 │   │   │   │   ├──<%= fileName %>.component.html       
 │   │   │   │   └──<%= fileName %>.component.ts         
 │   │   │   ├──models/                          
 │   │   │   │   └──<%= fileName %>.model.ts             
 │   │   │   ├──pages/                           
 │   │   │   │   ├──<%= fileName %>.page.css       
 │   │   │   │   ├──<%= fileName %>.page.html       
 │   │   │   │   └──<%= fileName %>.page.ts         
 │   │   │   ├──<%= fileName %>.module.ts                
 │   │   │   ├──<%= fileName %>.routing.module.ts        
 │   │   │   ├──<%= fileName %>.service.ts               
 │   │   │   ├──<%= fileName %>.pages.ts                 
 │   │   │   ├──<%= fileName %>.models.ts               
 │   │   │   └──<%= fileName %>.components.ts            
```

## File explanations

### <%= fileName %>.module.ts
### <%= fileName %>.routing.module.ts
### <%= fileName %>.service.ts

### <%= fileName %>.exports.ts

You could (I wont use should) place all your components in the folder/directory. 
This will add a good structure and as your project grows it will make it easier to locate file.

Optionally you can also add an export * from './components/<%= fileName %>.component';
That will make it easy to import your component in a module or any other place you need
to import the component.

e.g in the module file you import the <%= fileName %>.components and not each individual component.

### components directory

#### component file.
According to the Angular 2 style guide you should place each component in their own file. I fully support this
It will give you a better structure and it will be easy to find the class you are looking for.

Use an export statement in the *.components.ts file in the root of the module folder/directory to combine 
all the components into a single file.
