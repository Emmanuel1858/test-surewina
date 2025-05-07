import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  showLoader: boolean = false;
  formSubmitted: boolean = false;
  showErrorMessage: boolean = false;
  emailAddress: string = '';
  password: string = '';
  showError: string = '';
  firstName: string = ''
  lastName: string = ''
  initialFromLogin: string = ''
  address: boolean = false;

  constructor(private router: Router, private authService: AuthServiceService) { }


  ngOnInit(): void {
    sessionStorage.clear()
    const reason = localStorage.getItem('logoutReason');
    if (reason === 'inactivity') {
      alert('You were logged out due to inactivity');
      localStorage.removeItem('logoutReason');
      
    }

  }


  async navigateToDashboard() {
    this.formSubmitted = false; // Reset before checking

    if (!this.emailAddress.trim() || !this.password.trim()) {
      this.formSubmitted = true;
      setTimeout(() => {
        this.formSubmitted = false;
      }, 10000);
      return;
    }
    // if(this.password === '') {
    //   this.formSubmitted = true
    //   setTimeout(() => {
    //     this.formSubmitted = false
    //   }, 10000);
    //   return
    // }

    const credentialsLoginUser = {
      user: this.emailAddress,
      password: this.password
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.authService.loginUser(credentialsLoginUser))
      this.showLoader = false
      if (response.responseStatus === false) {
        this.showError = response.responseMessage
        this.showErrorMessage = true
        setTimeout(() => {
          this.showErrorMessage = false
        }, 15000);
        return
      } else {
        sessionStorage.setItem('firstName', response.result.firstName)
        sessionStorage.setItem('lastName', response.result.lastName)
        // console.log(response.result.jwtToken)
        sessionStorage.setItem('token', response.result.jwtToken)
        sessionStorage.setItem('phoneNumber', response.result.phoneNumber)
        // sessionStorage.setItem('address', response.result.address)
        sessionStorage.setItem('address', String(response.result.address));

        this.router.navigate(['/dashboard'])
      }
    } catch (error) {
      this.showLoader = false
      console.error(error)
    }


   
  }

  navigateToCreateAcc() {
    this.router.navigate(['/create-account-name'])
  }

  navigateBack() {
    sessionStorage.clear()
    this.router.navigate([''])
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    this.firstName = `${sessionStorage.getItem('firstName')}`
    this.lastName = `${sessionStorage.getItem('lastName')}`
    this.initialFromLogin = (this.firstName?.charAt(0) || '') + (this.lastName?.charAt(0))
    sessionStorage.setItem('initialFromLogin', this.initialFromLogin)
  }
}
