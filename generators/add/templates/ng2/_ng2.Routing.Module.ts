import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

// Because we are linking these components in the routing
// we need to import them here.  
import { <%= singularName %>IndexPage, <%= singularName %>EditPage} from './<%= singularName %>.Pages';

@NgModule({
  imports: [
    RouterModule.forChild([ 
      // using the forChild method here means that we apply this on the root routing.
      { path: '<%= pluralLowerName %>', component: <%= singularName %>IndexPage},      
      { path: '<%= pluralLowerName %>/:<%= singularLowerName %>Id', component: <%= singularName %>EditPage },      
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class <%= singularName %>RoutingModule {}