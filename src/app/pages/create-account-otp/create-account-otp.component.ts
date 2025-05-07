import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-create-account-otp',
  templateUrl: './create-account-otp.component.html',
  styleUrls: ['./create-account-otp.component.scss']
})
export class CreateAccountOtpComponent implements OnInit, OnDestroy {

  otp: string[] = ['', '', '', '', '', ''];
  firstName: string = this.dataService.getRegisterUserData('firstName')
  lastName: string = this.dataService.getRegisterUserData('lastName')
  phoneNumber: string = this.dataService.getRegisterUserData('phoneNumber')
  password: string = this.dataService.getRegisterUserData('password')
  email: string = this.dataService.getRegisterUserData('emailAddress')
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
  inactivityTimeout: any;
  inactivityDuration = 15 * 60 * 1000;

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
    }, 7000)



  }

  navigateToDashboard() {
    this.router.navigate(['/login'])
  }
  navigateToPassword() {
    this.router.navigate(['/create-account-password'])
  }

  addActivityListeners() {
    const events = ['click', 'keydown'];
    events.forEach(event =>
      window.addEventListener(event, this.resetInactivityTimer.bind(this))
    );
  }

  removeActivityListeners() {
    const events = ['click', 'keydown'];
    events.forEach(event =>
      window.removeEventListener(event, this.resetInactivityTimer.bind(this))
    );
  }

  resetInactivityTimer() {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.handleInactivityLogout();
    }, this.inactivityDuration);
  }

  handleInactivityLogout() {
    localStorage.setItem('logoutReason', 'inactivity');
    // this.authService.logout(); // your logout logic here
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.startCarousel();
    this.resetInactivityTimer();
    this.addActivityListeners();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.removeActivityListeners();
    clearTimeout(this.inactivityTimeout)
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 4000);
  }

}
