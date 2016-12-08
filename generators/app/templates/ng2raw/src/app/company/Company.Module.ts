import { NgModule } from '@angular/core'; // lets us use the @NgModule 
import { BrowserModule } from '@angular/platform-browser'; // lets us use *ngFor, *ngIf in the html code
import { FormsModule } from '@angular/forms'; // lets us use the goodies in our html code
import { HttpModule } from '@angular/http'; // used in the CompanyService to get, put, delete and post
import { RouterModule } from '@angular/router'; // used by the Company Router to create routes, but also to use router parameters

// need to import (the following statement), declare and export all company components
import { CompanyListComponent } from './list/Company.Table.Component';
import { CompanyEditComponent } from './edit/Company.Edit.Component';
import { AddCompanyWidget } from './widgets/Company.Add.Component';

// services
import { CompanyService} from './Company.Service';

// routing
import { CompanyRoutingModule} from "./Company.Module.Routes";

// we are using components from the person folder and by importing the PersonModule
// theres is no need to import the individual person components
import { PersonModule } from '../person/Person.Module';

@NgModule({

    // When we import a module it is then accessable for the components that we use inside this module
    imports: [HttpModule, PersonModule, BrowserModule, RouterModule, CompanyRoutingModule, FormsModule],

    // before we can use the components in html we need to declare them
    declarations: [CompanyListComponent,CompanyEditComponent, AddCompanyWidget],
    
    // this is the service we provide. When we provide it on high up like this it is treated like a singleton
    // and we can inject it into to our own components.
    // any injectable services must be annotated with the @injectable (see CompanyService)
    providers: [CompanyService],

    // we need to export the declared components so that any consumers of this module can use
    // the components we have made 
    exports: [CompanyListComponent,CompanyEditComponent,AddCompanyWidget,CompanyRoutingModule]
})
export class CompanyModule {}