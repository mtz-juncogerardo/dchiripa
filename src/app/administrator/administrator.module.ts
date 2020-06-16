import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './administrator.component';
import { environment } from '../../environments/environment';
import { ComponentsModule } from '../core/components/components.module';
import { ProductsComponent } from './products/products.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';
import { SliderComponent } from './slider/slider.component';


@NgModule({
  declarations: [AdministratorComponent, ProductsComponent, SliderComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    AdministratorRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'dchiripa'),
    ReactiveFormsModule
  ],
  providers: [AngularFireStorage]
})
export class AdministratorModule { }
