import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword: boolean = false;
  showLoader: boolean = false;
  formSubmitted: boolean = false;
  showErrorMessage: boolean = false;
  emailAddress: string = '';
  password: string = '';
  showError: string = '';

  constructor(private router: Router, private authService: AuthServiceService) { }

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
        sessionStorage.setItem('token', response.result.jwtToken)
        sessionStorage.setItem('phoneNumber', response.result.phoneNumber)
        this.router.navigate(['/dashboard'])
      }
    } catch (error) {
      console.error(error)
    }


    this.router.navigate(['/dashboard'])
  }

  navigateToCreateAcc() {
    this.router.navigate(['/create-account-name'])
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
