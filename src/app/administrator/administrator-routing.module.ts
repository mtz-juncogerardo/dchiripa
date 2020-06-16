import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorComponent } from './administrator.component';
import {ProductsComponent} from "./products/products.component";
import {SliderComponent} from "./slider/slider.component";

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'slider',
        component: SliderComponent
      }
      ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
