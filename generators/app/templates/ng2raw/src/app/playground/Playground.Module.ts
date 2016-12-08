import { NgModule } from '@angular/core'; // lets us use the @NgModule 
import { BrowserModule } from '@angular/platform-browser'; // lets us use *ngFor, *ngIf in the html code
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'; // lets us use the goodies in our html code
import { HttpModule } from '@angular/http'; // used in the CompanyService to get, put, delete and post
import { RouterModule } from '@angular/router'; // used by the Company Router to create routes, but also to use router parameters

// import, declare and export
import {AdvancedFormComponent} from './forms/Forms.Advanced.Component';
import {BasicFormComponent} from './forms/Forms.Basic.Component';
import {FormBuilderComponent} from './forms/Forms.Builder.Component';

// routing
import { PlaygroundRoutingModule} from "./Playground.Routing.Module";

@NgModule({

    // When we import a module it is then accessable for the components that we use inside this module
    imports: [HttpModule, BrowserModule, RouterModule, PlaygroundRoutingModule, FormsModule,ReactiveFormsModule ],

    // before we can use the components in html we need to declare them
    declarations: [AdvancedFormComponent, BasicFormComponent, FormBuilderComponent],
        
    // we need to export the declared components so that any consumers of this module can use
    // the components we have made 
    exports: [AdvancedFormComponent, BasicFormComponent, FormBuilderComponent, PlaygroundRoutingModule]
})
export class PlaygroundModule {}