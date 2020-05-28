import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './administrator.component';
import { environment } from '../../environments/environment';
import { ComponentsModule } from '../core/components/components.module';
import { ProductsComponent } from './products/products.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [AdministratorComponent, ProductsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    AdministratorRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdministratorModule { }
