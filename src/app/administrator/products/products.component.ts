import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../../core/services/firebase.service";
import {Product} from "../../core/interfaces/product.interface";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;

  constructor(private form: FormBuilder, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.productForm = this.form.group({
      id: '',
      name: ['', [Validators.required]],
      category: 'Tablas',
      stock: 1,
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      descount: true,
      descountPrice: '',
      imageFront: ['', [Validators.required]],
      imageBack: '',
    })
  }

  addProduct(product: Product){
    this.firebase.addProduct(product)
      .then((res) => {
        this.productForm.value.id = res.id;
        this.firebase.updateProduct(this.productForm.value);
      });
  }
}
