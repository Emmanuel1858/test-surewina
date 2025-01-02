import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-account-name',
  templateUrl: './create-account-name.component.html',
  styleUrls: ['./create-account-name.component.scss']
})
export class CreateAccountNameComponent implements OnInit, OnDestroy {
  images: string[] = [
    '../../../assets/Property 1=Splash Screen - Carousel 1.png',
    '../../../assets/Property 1=Splash Screen - Carousel 2.png',
    '../../../assets/Property 1=Splash Screen - Carousel 3.png'
  ];
  activeIndex = 0;
  private intervalId: any;

  constructor(private router: Router) {}


  navigateToPassword(){
    this.router.navigate(['/create-account-password'])
  }

  
  navigateBack(){
    this.router.navigate([''])
  }
  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); 
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length; 
    }, 4000);
  }

}
