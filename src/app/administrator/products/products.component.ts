import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../core/services/firebase.service';
import { Product } from '../../core/interfaces/product.interface';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  entities: Product[] = [];
  frontImageURL: Observable<string>;
  backImageURL: Observable<string>;
  uploadPercent: Observable<number>;
  blockButton = false;

  constructor(private form: FormBuilder, private firebase: FirebaseService, private afs: AngularFireStorage) {
    this.productForm = this.form.group({
      id: '',
      name: ['', [Validators.required]],
      category: 'Tablas',
      stock: 1,
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      descount: false,
      descountPrice: '',
      imageFront: '',
      imageBack: ''
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.firebase.getProducts().toPromise()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data: Product = doc.data() as Product;
          this.entities.push(data);
        });
      });
  }

  addProduct(product: Product) {
    // Condition to delete the value of descountPrice if descount is set to false.
    if (!this.productForm.get('descount').value) {
      this.productForm.patchValue({descountPrice: ''});
    }
    if (this.backImageURL) {
      const image = document.getElementById('backImage');
      const src = image.getAttribute('src');
      this.productForm.patchValue({imageBack: src}) ;
    }
    if (this.frontImageURL) {
      const image = document.getElementById('frontImage');
      const src = image.getAttribute('src');
      this.productForm.patchValue({imageFront: src});
    }

    this.firebase.addProduct(product)
      .then((res) => {
        this.productForm.value.id = res.id;
        this.firebase.updateProduct(this.productForm.value)
          .then(() => {
            Swal.fire('Producto Agregado Correctamente').then(() => window.location.reload());
          });
      });
  }

  updateProduct(product: Product) {
    this.firebase.updateProduct(product)
      .then(() => console.log('yei'));
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras volver a recuperar los datos de tu producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!, Eliminalo',
      cancelButtonText: 'No, Quiero conservarlo'
    }).then(async (result) => {
      if (result.value) {
        await this.firebase.deleteProduct(id);
        await Swal.fire('Eliminado!');
        window.location.reload();
      }
    });
  }

  loadImage(event: any, imagePosition: string) {
    const randomId = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `products/${randomId}-${imagePosition}`;
    const fileRef = this.afs.ref(filePath);
    const task = this.afs.upload(filePath, file);
    // Block Sumbit Button until image has been uploaded
    this.blockButton = true;
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(async () => {
        if(imagePosition === 'front') { this.frontImageURL = await fileRef.getDownloadURL() }
        else { this.backImageURL = await fileRef.getDownloadURL() }
        this.blockButton = false;
      })
    )
      .subscribe()
  }
}
