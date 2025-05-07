import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vendor-create-account-name',
  templateUrl: './vendor-create-account-name.component.html',
  styleUrls: ['./vendor-create-account-name.component.scss']
})
export class VendorCreateAccountNameComponent implements OnInit, OnDestroy {
  images: string[] = [
    '../../../assets/Property 1=Splash Screen - Carousel 1.png',
    '../../../assets/Property 1=Splash Screen - Carousel 2.png',
    '../../../assets/Property 1=Splash Screen - Carousel 3.png'
  ];
  activeIndex = 0;
  private intervalId: any;
  formSubmitted: boolean = false
  firstName: string = ''
  lastName: string = ''
  phoneNumber: string = ''
  emailAddress: string = ''
  referred: string = ''
  BVN: string = ''
  NIN: string = ''

  constructor(private router: Router, private dataService: DataService) { }

  isEmpty(value: string): boolean {
    return !value || value.trim() === '';
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // You can use regex for more accurate validation if needed
  }
  onPhoneInput(event: any): void {
    let input = event.target.value;

    // Allow digits and optional '+' at the start
    if (input.startsWith('+')) {
      input = '+' + input.slice(1).replace(/\D/g, '');
    } else {
      input = input.replace(/\D/g, '');
    }

    // Limit to 15 characters
    if (input.length > 15) {
      input = input.slice(0, 15);
    }

    this.phoneNumber = input;
  }
  isInvalidPhoneNumber(): boolean {
    // Allow phone numbers starting with optional '+' and 8-15 total characters
    return !/^\+?\d{8,14}$/.test(this.phoneNumber);
  }
  navigateToPassword() {
    const isValid =
      !this.isEmpty(this.firstName) &&
      !this.isEmpty(this.lastName) &&
      !this.isEmpty(this.phoneNumber) &&
      !this.isEmpty(this.emailAddress) &&
      !this.isEmpty(this.BVN) &&
      !this.isEmpty(this.NIN) &&
      this.isValidEmail(this.emailAddress) &&
      !this.isInvalidPhoneNumber()
    if (isValid) {
      this.dataService.setRegisterVendorData('firstName', this.firstName)
      this.dataService.setRegisterVendorData('lastName', this.lastName)
      this.dataService.setRegisterVendorData('phoneNumber', this.phoneNumber)
      this.dataService.setRegisterVendorData('emailAddress', this.emailAddress)
      this.dataService.setRegisterVendorData('BVN', this.BVN)
      this.dataService.setRegisterVendorData('NIN', this.NIN)

      this.dataService.setRegisterUserData('referral', this.referred)
      this.router.navigate(['/vendor-create-account-password'])
    } else {
      this.formSubmitted = true
    }

  }

  navigateToLogin() {
    this.router.navigate(['/vendor-login'])
  }


  navigateBack() {
    this.router.navigate(['/vendor-login'])
  }
  ngOnInit(): void {
    this.startCarousel();
    this.firstName = this.dataService.getRegisterUserData('firstName') || ''
    this.lastName = this.dataService.getRegisterUserData('lastName') || ''
    this.phoneNumber = this.dataService.getRegisterUserData('phoneNumber') || ''
    this.emailAddress = this.dataService.getRegisterUserData('emailAddress') || ''
    this.BVN = this.dataService.getRegisterUserData('BVN') || ''
    this.NIN = this.dataService.getRegisterUserData('NIN') || ''
    this.referred = this.dataService.getRegisterUserData('referral') || ''
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
