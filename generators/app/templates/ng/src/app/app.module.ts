import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from "@angular/common";
import "./core/rxjs-extensions";
<% if (front === 'md2') { %>import { MaterialModule } from "@angular/material";<% } %>
// feature modules - our own
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
    PageNotFound,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    <% if (front === 'md2') { %>MaterialModule.forRoot(),<% } %>
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
