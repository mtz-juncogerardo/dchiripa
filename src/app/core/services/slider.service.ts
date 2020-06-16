import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Slider } from "../interfaces/slider.interface";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  slidesCollection: AngularFirestoreCollection<Slider>;
  slides: Observable<Slider[]>;
  slideDoc: AngularFirestoreDocument<Slider>;


  constructor(public afs: AngularFirestore) {

    this.slidesCollection = this.afs.collection('slides');

    this.slides = this.slidesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Slider;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getSlides(){
    return this.slidesCollection.get();
  }

  addSlide(slide: Slider){
    return this.slidesCollection.add(slide);
  }

  updateSlide(slide: Slider){
    this.slideDoc = this.afs.doc(`slides/${slide.id}`);
    return this.slideDoc.update(slide);
  }

  deleteSlide(id: string){
    this.slideDoc = this.afs.doc(`slides/${id}`);
    return this.slideDoc.delete();
  }
}
