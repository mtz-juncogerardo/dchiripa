import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Product} from "../interfaces/product.interface";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(public afs: AngularFirestore) {

    this.productsCollection = this.afs.collection('products');

    this.products = this.productsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getProducts(){
    return this.productsCollection.get();
  }

  addProduct(product: Product){
    return this.productsCollection.add(product);
  }

  updateProduct(product: Product){
    this.productDoc = this.afs.doc(`products/${product.id}`);
    return this.productDoc.update(product);
  }

  deleteProduct(id: string){
    this.productDoc = this.afs.doc(`products/${id}`);
    return this.productDoc.delete();
  }
}
