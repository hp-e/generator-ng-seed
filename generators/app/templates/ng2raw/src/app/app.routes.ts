import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { PageNotFound} from './shared/page-not-found';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},  
  { path: '**', pathMatch: 'full', component: PageNotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//NOTE:
// Because the CompanyModule imports its own Routing (Company.Module.Routes.ts) we do not need to 
// import it again here.
// the important thing is that this routing has the .forRoot method and our own routing modules
// uses forChild method (see Company.Module.Routes)