import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';


// Because we are linking these components in the routing
// we need to import them here.  
import {CompanyEditComponent} from './edit/Company.Edit.Component';
import {CompanyListComponent} from './list/Company.Table.Component';

@NgModule({
  imports: [
    RouterModule.forChild([ 
      // using the forChild method here means that we apply this on the root routing.
      { path: 'companies', component: CompanyListComponent},      
      { path: 'companies/:id', component: CompanyEditComponent },      
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class CompanyRoutingModule {}