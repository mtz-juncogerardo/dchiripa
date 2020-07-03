import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  hide = true;
  newUser: User;
  email = new FormControl('', [Validators.required, Validators.email]);
  address = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)])
  phone = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);

  constructor() {
  }

  ngOnInit(): void {
  }

  getErrorMessage(input) {

    if(input === 'email'){
      if (this.email.hasError('required')) return 'Debes Llenar el campo'
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
    if(input === 'address'){
      if (this.address.hasError('required')) return 'Debes Llenar el campo'
    }
    if(input === 'firstName'){
      if (this.address.hasError('required')) return 'Debes Llenar el campo'
    }
    if(input === 'lastName'){
      if (this.address.hasError('required')) return 'Debes Llenar el campo'
    }
    if(input === 'password'){
      if (this.address.hasError('minLength')) return 'La contraseña debe ser de 8 caracteres minimo'
    }
    if(input === 'phone') {
      if (this.address.hasError('minLength') || this.address.hasError('maxLength')) {
        return 'El telefono debe contener al menos 10 digitos'
      }
    }
  }

}
