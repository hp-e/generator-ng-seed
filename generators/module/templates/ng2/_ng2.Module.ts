import { NgModule } from "@angular/core"; // lets us use the @NgModule 
<% if (!lazyLoading) { %>import { BrowserModule } from "@angular/platform-browser"; <% } %> // lets us use *ngFor, *ngIf in the html code
<% if (lazyLoading) { %>import { CommonModule } from "@angular/common"; <% } %> 
import { FormsModule } from "@angular/forms"; // lets us use the goodies in our html code
import { HttpModule } from "@angular/http"; // used in the CompanyService to get, put, delete and post
import { RouterModule } from "@angular/router"; // used by the Company Router to create routes, but also to use router parameters
// pages, components and directives
//import {  }  from "./<%= singularKebabName %>.exports";

<% if (!skipRouting) { %>
// routing
import { <%= singularName %>RoutingModule} from "./<%= singularKebabName %>.routing.module";
<% } %>
// services
<% if (addService) { %>import { <%= singularName %>Service} from "./<%= singularKebabName %>.service";<% } %>


@NgModule({

    // when we import a module it is then accessable for the components that we use inside this module
    imports: [
        HttpModule, 
        <% if (!lazyLoading) { %>BrowserModule, <% } %> 
        <% if (lazyLoading) { %>CommonModule, <% } %> 
        RouterModule, 
        <% if (!skipRouting) { %><%= singularName %>RoutingModule, <% } %>
        FormsModule
    ],

    // before we can use the components in html we need to declare them
    declarations: [],

    // this is the service we provide. When we provide it on high up like this it is treated like a singleton
    // and we can inject it into to our own components.
    // any injectable services must be annotated with the @injectable (see <%= singularName %>Service)
<% if (addService) { %>    providers: [<%= singularName %>Service],<% } %>

    // we need to export the declared components so that any consumers of this module can use
    // the components we have made 
    exports: [<% if (!skipRouting) { %>, <%= singularName %>RoutingModule<% } %>]
})
export class <%= singularName %>Module {}