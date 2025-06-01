import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin-portal-login',
  templateUrl: './admin-portal-login.component.html',
  styleUrls: ['./admin-portal-login.component.scss']
})
export class AdminPortalLoginComponent {

  user: string = ''
  password: string = ''
  errMsg: string = ''

  constructor(private router: Router, private authService: AuthServiceService){}

  async navigateToAdminDash() {
    const credentials = {
      user: this.user,
      password: this.password
    }

    try {
      const response = await lastValueFrom(this.authService.loginAdmin(credentials))
      if(response.responseStatus === false) {
        this.errMsg = response.responseMessage
        return 
      }

      if (response.responseStatus === true) {
        this.router.navigate(['/admin-dashboard'])
      }
    } catch (e) {
      console.log(e)
    }

  }

}
