import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.scss']
})
export class SelectProfileComponent implements OnInit {

  images: string[] = [
    '../../../assets/Property 1=Splash Screen - Carousel 1.png',
    '../../../assets/Property 1=Splash Screen - Carousel 2.png',
    '../../../assets/Property 1=Splash Screen - Carousel 3.png'
  ];

  activeIndex = 0;
  private intervalId: any;


  constructor(private router: Router){}
  naviagteToUserLogin() {
    this.router.navigate(['/login'])
  }
  navigateToVendorLogin() {
    this.router.navigate(['/vendor-login'])
  }
  navigateToAdminLogin() {
    this.router.navigate(['/admin-login'])
  }

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
