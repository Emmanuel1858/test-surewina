import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-password',
  templateUrl: './create-account-password.component.html',
  styleUrls: ['./create-account-password.component.scss']
})
export class CreateAccountPasswordComponent implements OnInit, OnDestroy {
  showPassword: boolean = false;
  showReEnterPassword: boolean = false;
  images: string[] = [
    '../../../assets/Property 1=Splash Screen - Carousel 1.png',
    '../../../assets/Property 1=Splash Screen - Carousel 2.png',
    '../../../assets/Property 1=Splash Screen - Carousel 3.png'
  ];
  activeIndex = 0;
  private intervalId: any;

constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleReEnterPasswordVisibility() {
    this.showReEnterPassword = !this.showReEnterPassword;
  }

  navigateToOtp() {
    this.router.navigate(['/create-account-otp'])
  }
  navigateToName() {
    this.router.navigate(['/create-account-name'])
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
