import { Component, OnInit, HostBinding } from '@angular/core';
import {SliderService} from "../core/services/slider.service";
import {Slider} from "../core/interfaces/slider.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  slides: Slider[] = []
  wantsToSignin = true;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: true,
    dots: true,
    dotsClass: 'hero-dots',
    pauseOnDotsHover: true,
    pauseOnHover: false,
    "nextArrow": "<div class='nav-next home-slider-next'><i class='fas fa-caret-right'></i></i></div>",
    "prevArrow": "<div class='nav-prev home-slider-prev'><i class='fas fa-caret-right'></i></div>",
  };

  constructor(private sliderService: SliderService, private router: Router) { }

  ngOnInit(): void {
    this.sliderService.getSlides().toPromise()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data: Slider = doc.data() as Slider;
          this.slides.push(data);
        });
      });
  }

  toogleFormType() {
    this.wantsToSignin ? this.wantsToSignin = false : this.wantsToSignin = true;
  }

}
