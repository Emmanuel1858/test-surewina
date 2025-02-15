import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-vendor',
  templateUrl: './layout-vendor.component.html',
  styleUrls: ['./layout-vendor.component.scss']
})
export class LayoutVendorComponent implements OnInit {
  showMenu: boolean = false;
  initials: string = `${sessionStorage.getItem('initialFromLoginVendor')}`

  constructor(private router: Router){}


  ngOnInit(): void {
    // window.location.reload()

  }

  openMenu() {
    this.showMenu = true
  }

  logout() {
    this.router.navigate(['/vendor-login'])
    sessionStorage.clear()
  }
  showDashboard() {
    this.showMenu = false
    this.router.navigate(['/vendor-dashboard'])
  }

  showWinner() {
    this.showMenu = false
    this.router.navigate(['/vendor-winner-board'])
  }

  showTicket() {
    this.showMenu = false
    this.router.navigate(['/vendor-ticket-history'])
  }
  navigateToProfile() {
    this.router.navigate(['/vendor-profile'])
  }

  closeMenu() {
    this.showMenu = false
  }

  

}
