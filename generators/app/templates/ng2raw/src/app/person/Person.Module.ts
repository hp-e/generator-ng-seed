import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//import {CompanyListModel} from './CompanyListModel';
import { PersonTableComponent } from '../person/Person.Table.Component';
import { AddPersonWidget } from '../person/Person.Add.Widget';
import { PersonService } from '../person/Person.Service';


@NgModule({
    imports: [HttpModule, BrowserModule, RouterModule, FormsModule],
    declarations: [PersonTableComponent,AddPersonWidget],
    providers: [PersonService],
    exports: [PersonTableComponent,AddPersonWidget]
})
export class PersonModule {}