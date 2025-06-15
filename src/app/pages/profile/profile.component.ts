import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

  currentRoute: string = '';
  tabs: string = 'profile-details';
  showBackBtn: boolean = false;
  showNINUpdate: boolean = false;
  showlocationUpdate: boolean = false;
  showEmailUpdate: boolean = false;
  showPasswordUpdate: boolean = false;
  showNumberUpdate: boolean = false;
  showLoader: boolean = false;
  commissionEarned: string = '1,676,200';
  status: string = 'active';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  jollyPoints: any = null;
  address: string = '';
  firstAddress: any ;
  password: string = '';
  showError: string = '';
  updateAddress: string = '';
  oldPassword: string = ''
  newPassword: string = '';
  confirmNewPassword: string = '';
  showPassError: boolean = false;
  initial: string = `${sessionStorage.getItem('initial')}`
  // phoneNumber: string = `${sessionStorage.getItem('phoneNumber')}`
  modalVisibility: boolean = false
  inactivityTimeout: any;
  inactivityDuration = 15 * 60 * 1000;

  constructor(private userAccontService: UserAccountService, 
    private router: Router
  ) { }

  async getUserDetails() {
    try {
      this.showLoader = true
      const response = await this.userAccontService.userDetails().toPromise();
      // console.log(response)
      this.email = response.result.email
      this.firstName = response.result.firstName
      this.lastName = response.result.lastName
      this.phoneNumber = response.result.phoneNumber
      this.jollyPoints = response.result.jollyPoints
      this.address = response.result.address
      this.showLoader = false

    } catch (error) {
    
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/login'])
      sessionStorage.clear()
      this.showLoader = false
      // console.log(error)
    }
  }

  ngOnInit(): void {
    this.getUserDetails()
    this.resetInactivityTimer();
    this.addActivityListeners();
  }

  ngOnDestroy(): void {
    this.removeActivityListeners();
    clearTimeout(this.inactivityTimeout)
      // if(this.address === '') {
      //   sessionStorage.setItem('address', false)
      // } else {
      //   sessionStorage.setItem('address', true)
      // }
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

  switchTab(tab: string) {
    this.tabs = tab;
  }



  updateNIN() {
    this.showNINUpdate = true
  }
  updateLocationUpdate() {
    this.showlocationUpdate = true
  }
  updatePassword() {
    this.showPasswordUpdate = true
  }
  updateEmail() {
    this.showEmailUpdate = true
  }

  updateNumber() {
    this.showNumberUpdate = true
  }

  closeAllModal() {
    this.showEmailUpdate = false
    this.showNINUpdate = false
    this.showNumberUpdate = false
    this.showPasswordUpdate = false
    this.showlocationUpdate = false
  }

  closeModalOnOutsideClick(event: MouseEvent): void {
    this.closeAllModal();
  }

  reloadPage() {
    this.modalVisibility = false
    this.closeAllModal()
    window.location.reload();
  }

 async completeLocation() {
    if(this.updateAddress === '' ) {
       this.showError = 'Please input your address!'
      setTimeout(() => {
        this.showError = ''
      }, 10000);
     
      return
    }
    const credentialsAddressUpdate = {
      password: this.password,
      address: this.updateAddress
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userAccontService.userAddressUpdate(credentialsAddressUpdate))
      this.showLoader = false
      // console.log(response)
      if(response.responseStatus === false) {
        this.showError = response.responseMessage
        
      } else {
        this.modalVisibility = true
      }
    } catch(error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/login'])
      sessionStorage.clear()
      console.error(error)
    }
   
  }

 async updateNewPassword() {
    if(this.newPassword !== this.confirmNewPassword) {
      this.showPassError = true
    } else {
      const credentialsPasswordUpdate = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }
      try {
        this.showLoader = true
        const response = await lastValueFrom(this.userAccontService.userPasswordUpdate(credentialsPasswordUpdate))
        this.showLoader = false
        // console.log(response)
        if(response.responseStatus === false) {
          this.showError = response.responseMessage
          
        } else {
          this.modalVisibility = true
        }
      } catch(error) {
        console.error(error)
        alert('You were logged out due to error. Try logging back in.');
        this.router.navigate(['/login'])
        sessionStorage.clear()
      }
    }
  }

  completeProfile() {
    this.modalVisibility = true
  }


}
