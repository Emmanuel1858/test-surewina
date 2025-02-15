import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.scss']
})
export class SelectProfileComponent {
  constructor(private router: Router){}
  naviagteToUserLogin() {
    this.router.navigate(['/login'])
  }
  navigateToVendorLogin() {
    this.router.navigate(['/vendor-login'])
  }
  navigateToAdminLogin() {
    this.router.navigate(['/admin-login'])
  }
}
