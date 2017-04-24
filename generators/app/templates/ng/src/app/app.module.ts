import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule, Title } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from "@angular/common";
import "./core/rxjs-extensions";
<% if (front === 'md2') { %>import { MaterialModule } from "@angular/material"; <% } %>
<% if (ngVersion === 'ng4') { %>import { FlexLayoutModule } from "@angular/flex-layout"; <% } %>
<% if (includeProdEnv === true){ %>import { AppProdSettings } from './settings/app.prod.settings';<% } %>
import { AppLocalSettings } from './settings/app.local.settings';
<% if (includeDevEnv === true){ %>import { AppDevSettings } from './settings/app.dev.settings';<% } %>

import { HomeComponent } from "./home/home.component";
import { AppSettings } from "./app.settings";
import { PageNotFound } from "./shared/page-not-found";

<% if (addFontAwesome === true) { %>
//import files for Font Awesome;
import "font-awesome/css/font-awesome.css";
  <% } %>

// user defined modules
// here we list modules we have created and that needs to be imported. 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFound
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    <% if (front === 'md2') { %>MaterialModule.forRoot(), <% } %>
    <% if (ngVersion === 'ng4') { %>FlexLayoutModule, <% } %>
    AppRoutingModule
  ],
providers: [
  Title,
  {
    provide: AppSettings,
    useFactory: () => {
      switch (process.env.NODE_ENV) {
          <% if (includeProdEnv === true){ %>case 'prod': return new AppProdSettings(); <% } %>                             
          <% if (includeProdEnv === true){ %>case 'dev': return new AppDevSettings(); <% } %>            
          case 'local': return new AppLocalSettings();                        
          default: return new AppLocalSettings();
        }                
      }
    },
{ provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
bootstrap: [AppComponent]
})
export class AppModule {

}
