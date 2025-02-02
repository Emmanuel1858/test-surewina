import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
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
  formSubmitted: boolean = false
  firstName: string = ''
  lastName: string = ''
  phoneNumber: string = ''
  emailAddress: string = ''
  referred: string = ''

  constructor(private router: Router, private dataService: DataService) { }

  isEmpty(value: string): boolean {
    return !value || value.trim() === '';
  }
  navigateToPassword() {
    const isValid =
      !this.isEmpty(this.firstName) &&
      !this.isEmpty(this.lastName) &&
      !this.isEmpty(this.phoneNumber) &&
      !this.isEmpty(this.emailAddress)

    if(isValid) {
      this.dataService.setRegisterUserData('firstName', this.firstName)
      this.dataService.setRegisterUserData('lastName', this.lastName)
      this.dataService.setRegisterUserData('phoneNumber', this.phoneNumber)
      this.dataService.setRegisterUserData('emailAddress', this.emailAddress)
      this.dataService.setRegisterUserData('referral', this.referred)
      this.router.navigate(['/create-account-password'])
    } else {
     this.formSubmitted = true
    }

  }

  navigateToLogin() {
    this.router.navigate(['/login'])
  }


  navigateBack() {
    this.router.navigate([''])
  }
  ngOnInit(): void {
    this.startCarousel();
    this.firstName = this.dataService.getRegisterUserData('firstName') || ''
    this.lastName = this.dataService.getRegisterUserData('lastName') || ''
    this.phoneNumber = this.dataService.getRegisterUserData('phoneNumber') || ''
    this.emailAddress = this.dataService.getRegisterUserData('emailAddress') || ''
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
