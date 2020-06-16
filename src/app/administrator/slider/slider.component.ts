import { Component, OnInit } from '@angular/core';
import {SliderService} from "../../core/services/slider.service";
import {Slider} from "../../core/interfaces/slider.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "angularfire2/storage";
import {Product} from "../../core/interfaces/product.interface";
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  slides: Slider[] = [];
  slideForm: FormGroup;
  slideImageURL: Observable<string>;
  uploadPercent: Observable<number>;
  blockButton = false;

  constructor(private firebase: SliderService, private form: FormBuilder, private afs: AngularFireStorage) {
    this.slideForm = this.form.group({
      id: '',
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      buttonText: ['', [Validators.required]],
      buttonURL: ['', [Validators.required]],
      image: ''
    });
  }

  ngOnInit(): void {
    this.getSlides();
  }

  getSlides() {
    this.firebase.getSlides().toPromise()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data: Slider = doc.data() as Slider;
          this.slides.push(data);
        });
      });
  }

  addSlide(slide: Slider) {
    if (this.slideImageURL) {
      const image = document.getElementById('slideImage');
      const src = image.getAttribute('src');
      this.slideForm.patchValue({image: src}) ;
    }

    this.firebase.addSlide(slide)
      .then((res) => {
        this.slideForm.value.id = res.id;
        this.firebase.updateSlide(this.slideForm.value)
          .then(() => {
            Swal.fire('El nuevo Slide ha sido añadido exitosamente').then(() => window.location.reload());
          });
      });
  }

  deleteSlide(id: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Estas a punto de eliminar este slide',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!, Eliminalo',
      cancelButtonText: 'No, Quiero conservarlo'
    }).then(async (result) => {
      if (result.value) {
        await this.firebase.deleteSlide(id);
        await Swal.fire('Se ha eliminado el Slide');
        window.location.reload();
      }
    });
  }

  loadImage(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `slides/${randomId}`;
    const fileRef = this.afs.ref(filePath);
    const task = this.afs.upload(filePath, file);
    // Block Sumbit Button until image has been uploaded
    this.blockButton = true;
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(async () => {
        this.slideImageURL = await fileRef.getDownloadURL()
        this.blockButton = false;
      })
    )
      .subscribe()
  }

}
