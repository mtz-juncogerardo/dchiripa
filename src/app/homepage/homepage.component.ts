import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

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
    "nextArrow": "<div class='nav-next home-slider-next'><i class='fas fa-directions'></i></i></div>",
    "prevArrow": "<div class='nav-prev home-slider-prev'><i class='fas fa-directions'></i></div>",
  };

  constructor() { }

  ngOnInit(): void {
  }

}
