import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-account-otp',
  templateUrl: './create-account-otp.component.html',
  styleUrls: ['./create-account-otp.component.scss']
})
export class CreateAccountOtpComponent implements OnInit, OnDestroy {
  otp: string[] = ['', '', '', '', '', ''];
  images: string[] = [
    '../../../assets/Property 1=Splash Screen - Carousel 1.png',
    '../../../assets/Property 1=Splash Screen - Carousel 2.png',
    '../../../assets/Property 1=Splash Screen - Carousel 3.png'
  ];
  activeIndex = 0;
  private intervalId: any;
  modalVisibility: boolean = false

  constructor(private router:Router) {}

  moveToNext(event: Event, index: number): void {
    const input = event.target as HTMLInputElement; 
    const value = input.value;
  
    if (value && value.length === 1 && index < this.otp.length - 1) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      nextInput?.focus(); 
    }
  
    if (!value && index > 0) {
      const previousInput = input.previousElementSibling as HTMLInputElement;
      previousInput?.focus(); 
    }
  }

  showModal() {
    this.modalVisibility = true
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'])
  }
  navigateToPassword() {
    this.router.navigate(['/create-account-password'])
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
