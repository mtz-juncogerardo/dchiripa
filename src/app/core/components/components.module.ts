import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormComponent } from './modal-form/modal-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [ModalFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ModalFormComponent]
})
export class ComponentsModule { }
