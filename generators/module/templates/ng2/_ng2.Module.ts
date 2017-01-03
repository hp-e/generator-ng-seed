import { NgModule } from "@angular/core"; // lets us use the @NgModule 
import { BrowserModule } from "@angular/platform-browser"; // lets us use *ngFor, *ngIf in the html code
import { FormsModule } from "@angular/forms"; // lets us use the goodies in our html code
import { HttpModule } from "@angular/http"; // used in the CompanyService to get, put, delete and post
import { RouterModule } from "@angular/router"; // used by the Company Router to create routes, but also to use router parameters
<% if (!skipPages) { %>
// pages, components and directives
import { <%= singularName %>IndexPage }  from "./<%= singularKebabName %>.pages";
//import {  }  from "./<%= singularKebabName %>.components";
<% } %>
<% if (!skipRouting) { %>
// routing
import { <%= singularName %>RoutingModule} from "./<%= singularKebabName %>.routing.module";
<% } %>
// services
import { <%= singularName %>Service} from "./<%= singularKebabName %>.service";


@NgModule({

    // when we import a module it is then accessable for the components that we use inside this module
    imports: [
        HttpModule, 
        BrowserModule, 
        RouterModule, 
        <% if (!skipRouting) { %><%= singularName %>RoutingModule, <% } %>
        FormsModule
    ],
<% if (!skipPages) { %>
    // before we can use the components in html we need to declare them
    declarations: [<%= singularName %>IndexPage],
<% } %>
    // this is the service we provide. When we provide it on high up like this it is treated like a singleton
    // and we can inject it into to our own components.
    // any injectable services must be annotated with the @injectable (see <%= singularName %>Service)
    providers: [<%= singularName %>Service],

    // we need to export the declared components so that any consumers of this module can use
    // the components we have made 
    exports: [<% if (!skipPages) { %><%= singularName %>IndexPage<% } %><% if (!skipRouting) { %>, <%= singularName %>RoutingModule<% } %>]
})
export class <%= singularName %>Module {}