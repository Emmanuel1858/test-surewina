import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-create-account-password',
  templateUrl: './create-account-password.component.html',
  styleUrls: ['./create-account-password.component.scss']
})
export class CreateAccountPasswordComponent implements OnInit, OnDestroy {
  firstName: string = this.dataService.getRegisterUserData('firstName')
  lastName: string = this.dataService.getRegisterUserData('lastName')
  phoneNumber: string = this.dataService.getRegisterUserData('phoneNumber')
  password: string = this.dataService.getRegisterUserData('password')
  referredBy: string = ''
  isConscent: boolean = false
  email: string = this.dataService.getRegisterUserData('emailAddress')
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

   
    const credentialsRegisterUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      password: this.password,
      email: this.email,
      referredBy: this.referredBy,
      isConscient: this.isConscent
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.authService.registerUser(credentialsRegisterUser))
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
        this.router.navigate(['/create-account-otp'])
        this.dataService.clearRegisterUserDataData()
      }
      
      
      

    } catch (error: any) {
      console.error(error)
      
    }
    
    
  }
  navigateToName() {
    this.router.navigate(['/create-account-name'])
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
