import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ContactInfo} from "../interfaces/contact-info.interface";

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  contactInfoCollection: AngularFirestoreCollection<ContactInfo>;
  contactInfo: Observable<ContactInfo[]>;
  contactInfoDoc: AngularFirestoreDocument<ContactInfo>;

  constructor(public afs: AngularFirestore) {
    this.contactInfoCollection = this.afs.collection('contact-info');

    this.contactInfo = this.contactInfoCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ContactInfo;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getContactInfo(){
    return this.contactInfoCollection.get();
  }

  updateContactInfo(contact: ContactInfo){
    this.contactInfoDoc = this.afs.doc(`contact-info/001`);
    return this.contactInfoDoc.update(contact);
  }
}
