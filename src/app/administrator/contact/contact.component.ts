import { Component, OnInit } from '@angular/core';
import {ContactInfoService} from "../../core/services/contact-info.service";
import {ContactInfo} from "../../core/interfaces/contact-info.interface";
import Swal from "sweetalert2";
import {Product} from "../../core/interfaces/product.interface";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private readonly id = '001';
  name = '';
  address= '';
  phone = '';
  email = '';

  constructor(private contactInfoService: ContactInfoService) { }

  ngOnInit(): void {
    this.contactInfoService.getContactInfo().toPromise()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data: ContactInfo = doc.data() as ContactInfo;
          this.name = data.name;
          this.address = data.address;
          this.email = data.email;
          this.phone = data.phone;
        });
      });
  }

  updateData() {
    const data: ContactInfo = {
      id: this.id,
      name: this.name,
      address: this.address,
      phone: this.phone,
      email: this.email
    }

    this.contactInfoService.updateContactInfo(data)
      .then(() => Swal.fire('Datos de contacto actualizados!'));
  }

}
