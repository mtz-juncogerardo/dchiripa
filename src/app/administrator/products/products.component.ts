import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';
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
  updateFormGroup: FormGroup;

  constructor(private form: FormBuilder, private firebase: ProductsService, private afs: AngularFireStorage) {
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

    this.updateFormGroup = this.form.group({
      id: '',
      updateName: ['', [Validators.required]],
      updateCategory: 'Tablas',
      updateStock: 1,
      updateDescription: ['', [Validators.required]],
      updatePrice: ['', [Validators.required]],
      updateDescount: false,
      updateDescountPrice: '',
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

  openUpdateModal(product: Product) {
    this.updateFormGroup.patchValue({id: product.id}) ;
    this.updateFormGroup.patchValue({updateName: product.name}) ;
    this.updateFormGroup.patchValue({updateCategory: product.category}) ;
    this.updateFormGroup.patchValue({updateStock: product.stock}) ;
    this.updateFormGroup.patchValue({updateDescription: product.description}) ;
    this.updateFormGroup.patchValue({updatePrice: product.price}) ;
    this.updateFormGroup.patchValue({updateDescount: product.descount}) ;
    this.updateFormGroup.patchValue({updateDescountPrice: product.descountPrice}) ;
  }

  updateForm(formValues: any) {
   const updateValues = {
     id: formValues.id,
     name: formValues.updateName,
     category: formValues.updateCategory,
     stock: formValues.updateStock,
     description: formValues.updateDescription,
     price: formValues.updatePrice,
     descount: formValues.updateDescount,
     descountPrice: formValues.updateDescountPrice
   }

    // Condition to delete the value of descountPrice if descount is set to false.
    if (!updateValues.descount) {
      updateValues.descountPrice = '';
    }

   this.firebase.updateProduct(updateValues)
     .then(() => {
       Swal.fire('Se han guardado los nuevos cambios al producto').then(() => window.location.reload());
     });
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
