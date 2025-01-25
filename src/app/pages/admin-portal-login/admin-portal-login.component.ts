import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-portal-login',
  templateUrl: './admin-portal-login.component.html',
  styleUrls: ['./admin-portal-login.component.scss']
})
export class AdminPortalLoginComponent {

  constructor(private router: Router){}

  navigateToAdminDash() {
    this.router.navigate(['/admin-dashboard'])
  }

}
