import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'homepage', pathMatch: 'full'
  },
  {
    path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  { path: 'administrator', loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
