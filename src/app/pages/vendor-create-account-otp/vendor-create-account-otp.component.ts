import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vendor-create-account-otp',
  templateUrl: './vendor-create-account-otp.component.html',
  styleUrls: ['./vendor-create-account-otp.component.scss']
})
export class VendorCreateAccountOtpComponent implements OnInit, OnDestroy {
  otp: string[] = ['', '', '', '', '', ''];
  firstName: string = this.dataService.getRegisterVendorData('firstName')
  lastName: string = this.dataService.getRegisterVendorData('lastName')
  phoneNumber: string = this.dataService.getRegisterVendorData('phoneNumber')
  password: string = this.dataService.getRegisterVendorData('password')
  email: string = this.dataService.getRegisterVendorData('emailAddress')
  referredBy: string = ''
  isConscent: boolean = false
  otpValidate: boolean = false
  showLoader: boolean = false
  images: string[] = [
    '../../../assets/Property 1=Splash Screen - Carousel 1.png',
    '../../../assets/Property 1=Splash Screen - Carousel 2.png',
    '../../../assets/Property 1=Splash Screen - Carousel 3.png'
  ];
  activeIndex = 0;
  private intervalId: any;
  modalVisibility: boolean = false

  constructor(private router: Router, private authService: AuthServiceService, private dataService: DataService) { }

  moveToNext(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value.length > 1) {
      input.value = value.charAt(0);
    }

    this.otp[index] = input.value;

    if (value && value.length === 1 && index < this.otp.length - 1) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      nextInput?.focus();
    }


    if (!value && index > 0) {
      const previousInput = input.previousElementSibling as HTMLInputElement;
      previousInput?.focus();
    }
  }

  async showModal() {
    this.showLoader = true
    setTimeout(() => {
      this.showLoader = false
      if (this.otp.join('').length === 6) {
        this.modalVisibility = true
      } else {
        this.otpValidate = true
        setTimeout(() => {
          this.otpValidate = false
        }, 10000);
      }
    }, 7000 )



  }

  navigateToDashboard() {
    this.router.navigate(['/vendor-login'])
  }
  navigateToPassword() {
    this.router.navigate(['/vendor-create-account-password'])
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
