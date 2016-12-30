import { NgModule }     from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// because we are linking these components in the routing
// we need to import them here.  
import { <%= singularName %>IndexPage, <%= singularName %>EditPage} from "./<%= singularKebabName %>.pages";

export const <%= singularCamel %>Routes: Routes = [
  // using the forChild method here means that we apply this on the root routing.
      { path: "<%= pluralLowerName %>", component: <%= singularName %>IndexPage},
      { path: "<%= pluralLowerName %>/:<%= singularCamel %>Id", component: <%= singularName %>EditPage },
];

@NgModule({
  imports: [
    RouterModule.forChild(<%= singularCamel %>Routes)
  ],
  exports: [
    RouterModule
  ]
})
export class <%= singularName %>RoutingModule {}