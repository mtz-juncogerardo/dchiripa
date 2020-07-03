import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { ComponentsModule } from '../core/components/components.module';
import { NosotrosComponent } from './nosotros/nosotros.component';

@NgModule({
  declarations: [HomepageComponent, NosotrosComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ComponentsModule,
    SlickCarouselModule
  ]
})
export class HomepageModule { }
