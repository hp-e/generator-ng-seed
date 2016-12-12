import { NgModule } from '@angular/core'

import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';
import './core/rxjs-extensions';

// feature modules - our own
import { HomeComponent } from './home/home.component';
import { AppSettings } from './app.settings';
import { PageNotFound } from './shared/page-not-found';

<% if (addFontAwesome === true) { %>
//import files for Font Awesome;
import "font-awesome/css/font-awesome.css";
<% } %>

// User defined modules
// Here we list modules we have created and that needs to be improtet dere. A module is imported 
// and we do not need to declare the component in the AppModule. 

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
    //viktig at denne modulen lastes før AppRoutingModule. 
    //AppRoutingModule har en "catch all" som vil trigges før routingen som er definert i 
     
    AppRoutingModule
  ],
  providers: [   
    AppSettings, 
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
