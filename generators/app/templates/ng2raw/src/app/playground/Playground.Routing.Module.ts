import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';


// Because we are linking these components in the routing
// we need to import them here.  
import {AdvancedFormComponent} from './forms/Forms.Advanced.Component';
import {BasicFormComponent} from './forms/Forms.Basic.Component';
import {FormBuilderComponent} from './forms/Forms.Builder.Component';

@NgModule({
  imports: [
    RouterModule.forChild([ 
      // using the forChild method here means that we apply this on the root routing.
      { path: 'forms/basic', component: BasicFormComponent},      
      { path: 'forms/advanced', component: AdvancedFormComponent },      
      { path: 'forms/builder', component: FormBuilderComponent },      
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PlaygroundRoutingModule {}