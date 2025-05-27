import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { stateLgaData } from 'src/state/stateLga';
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
  states = Object.keys(stateLgaData)
  lgas: string[] = [];
  selectedState: string = '';
  selectedLga: string = '';
  showStates: boolean = false;  
  showLgas: boolean = false; 
  private intervalId: any;
  formSubmitted: boolean = false
  firstName: string = ''
  lastName: string = ''
  phoneNumber: string = ''
  emailAddress: string = ''
  referred: string = ''
  inactivityTimeout: any;
  inactivityDuration = 15 * 60 * 1000; 

  // nigerianStates: string[] = [
  //   'Abia',
  //   'Adamawa',
  //   'Akwa Ibom',
  //   'Anambra',
  //   'Bauchi',
  //   'Bayelsa',
  //   'Benue',
  //   'Borno',
  //   'Cross River',
  //   'Delta',
  //   'Ebonyi',
  //   'Edo',
  //   'Ekiti',
  //   'Enugu',
  //   'FCT - Abuja',
  //   'Gombe',
  //   'Imo',
  //   'Jigawa',
  //   'Kaduna',
  //   'Kano',
  //   'Katsina',
  //   'Kebbi',
  //   'Kogi',
  //   'Kwara',
  //   'Lagos',
  //   'Nasarawa',
  //   'Niger',
  //   'Ogun',
  //   'Ondo',
  //   'Osun',
  //   'Oyo',
  //   'Plateau',
  //   'Rivers',
  //   'Sokoto',
  //   'Taraba',
  //   'Yobe',
  //   'Zamfara'
  // ];
  // inactivityDuration = 100000

  constructor(private router: Router, private dataService: DataService, private eRef: ElementRef) { }

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
      this.isValidEmail(this.emailAddress) &&
      !this.isInvalidPhoneNumber()

    if (isValid) {
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

  onStateSelect(state: string) {
    this.selectedState = state;
    this.lgas = stateLgaData[state];
    this.showStates = false
    this.showLgas = false
    this.selectedLga = ''; // Clear previous LGA selection
  }

  onLgaSelect(lga: string) {
    this.selectedLga = lga;
    this.showStates = false
    this.showLgas = false
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showStates = false;
      this.showLgas = false;
    }
  }

  navigateBack() {
    sessionStorage.clear()
    this.router.navigate([''])
  }
  ngOnInit(): void {
    this.startCarousel();
    this.resetInactivityTimer();
    this.addActivityListeners();
    this.firstName = this.dataService.getRegisterUserData('firstName') || ''
    this.lastName = this.dataService.getRegisterUserData('lastName') || ''
    this.phoneNumber = this.dataService.getRegisterUserData('phoneNumber') || ''
    this.emailAddress = this.dataService.getRegisterUserData('emailAddress') || ''
    this.referred = this.dataService.getRegisterUserData('referral') || ''
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.removeActivityListeners();
    clearTimeout(this.inactivityTimeout)
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
  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 4000);
  }

}
