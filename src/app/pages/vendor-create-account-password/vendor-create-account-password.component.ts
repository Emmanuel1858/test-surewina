import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-vendor-create-account-password',
  templateUrl: './vendor-create-account-password.component.html',
  styleUrls: ['./vendor-create-account-password.component.scss']
})
export class VendorCreateAccountPasswordComponent implements OnDestroy, OnInit {
  firstName: string = this.dataService.getRegisterVendorData('firstName')
  lastName: string = this.dataService.getRegisterVendorData('lastName')
  phoneNumber: string = this.dataService.getRegisterVendorData('phoneNumber')
  password: string = this.dataService.getRegisterVendorData('password')
  referredBy: string = ''
  isConscent: boolean = false
  email: string = this.dataService.getRegisterVendorData('emailAddress')
  BVN: string = this.dataService.getRegisterVendorData('BVN')
  NIN: string = this.dataService.getRegisterVendorData('NIN')
  showPassword: boolean = false;
  showReEnterPassword: boolean = false;
  showErrorMessage: boolean = false;
  showLoader: boolean = false;
  images: string[] = [
    '../../../assets/Property 1=Splash Screen - Carousel 1.png',
    '../../../assets/Property 1=Splash Screen - Carousel 2.png',
    '../../../assets/Property 1=Splash Screen - Carousel 3.png'
  ];
  activeIndex = 0;
  private intervalId: any;
  // password: string = ''
  confirmPass: string = ''
  showError: string = ''
  passWordCharacter: boolean = false
  passWordMatch: boolean = false

  constructor(private router: Router, private dataService: DataService, private authService: AuthServiceService) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleReEnterPasswordVisibility() {
    this.showReEnterPassword = !this.showReEnterPassword;
  }

  async navigateToOtp() {
    if (this.password !== this.confirmPass) {
      this.passWordMatch = true
      
      setTimeout(() => {
        this.passWordMatch = false
      }, 10000)
      return
    }
    if (this.password.length < 8) {
      this.passWordCharacter = true
      setTimeout(() => {
        this.passWordCharacter = false
      }, 10000);
      return
    }

   
    const credentialsRegisterVendor = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      password: this.password,
      email: this.email,
      bvn: this.BVN,
      nin: this.NIN,
      referredBy: this.referredBy,
     
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.authService.registerVendor(credentialsRegisterVendor))
      this.dataService.setRegisterUserData('password', this.password)
      console.log(response)
      this.showLoader = false
      if(response.responseStatus === false) {
       this.showError = response.responseMessage 
       
       if (this.showError) {
        this.showErrorMessage = true
        setTimeout(() => {
          this.showErrorMessage = false
        }, this.showError === 'Password too weak' ? 60000 : 15000);
        return
      }
      } else {
        this.router.navigate(['/vendor-create-account-otp'])
        this.dataService.clearRegisterUserDataData()
      }
      
      
      

    } catch (error: any) {
      console.error(error)
      
    }
    
    
  }
  navigateToName() {
    this.router.navigate(['/vendor-create-account-name'])
  }
  ngOnInit(): void {
    this.startCarousel();
    // this.password = this.dataService.getRegisterUserData
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
