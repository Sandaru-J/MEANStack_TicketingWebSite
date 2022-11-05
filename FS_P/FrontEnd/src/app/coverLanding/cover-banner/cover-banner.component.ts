import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-cover-banner',
  templateUrl: './cover-banner.component.html',
  styleUrls: ['./cover-banner.component.scss']
})
export class CoverBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  bannerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-right"></li>', '<i class="fa fa-arrow-left"></li>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
