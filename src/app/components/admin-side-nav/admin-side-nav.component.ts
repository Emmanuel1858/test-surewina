import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent {
   
  constructor(private router: Router) {

  }

  
  // navigateToDashboard() {
  //   this.router.navigate(['/admin-dashboard'])
  // }

  // navigateToUser() {
  //   this.router.navigate(['/users'])
  // }

  // navigateToLottery() {
  //   this.router.navigate(['/lottery'])
  // }

  // navigateToTrans() {
  //   this.router.navigate(['/transaction'])
  //   console.log('ugiyft')
  // }

  userName: string = 'Dasola A';
  userEmail: string = 'dasola_dzn@gmail.com';
}
