import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-layout-vendor',
  templateUrl: './layout-vendor.component.html',
  styleUrls: ['./layout-vendor.component.scss']
})
export class LayoutVendorComponent implements OnInit, OnDestroy {
  showMenu: boolean = false;
  private sub!: Subscription
  showLogout: boolean = false
  inactivityTimeout: any;
  inactivityDuration = 10 * 60 * 1000;
  initials: string = `${sessionStorage.getItem('initialFromLoginVendor')}`

  constructor(private router: Router, 
    private sharedService: SharedService
  ){}


  ngOnInit(): void {
    this.resetInactivityTimer();
    this.addActivityListeners();
    // window.location.reload()

  }

  ngOnDestroy(): void {
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
    this.router.navigate(['/vendor-login']);
  }

  openMenu() {
    this.showMenu = true
    this.sharedService.setTicketBtn(false)
  }
  yesLogout() {
    this.router.navigate(['/vendor-login'])
    sessionStorage.clear()
  }

  cancel() {
    this.showMenu = true
    this.showLogout = true
    // this.showMobileBtn = false
  }

  logout() {
    this.showLogout = true
    this.showMenu = false
    // this.router.navigate(['/vendor-login'])
  }
  showDashboard() {
    this.showMenu = false
    this.router.navigate(['/vendor-dashboard'])
    this.sharedService.setTicketBtn(true)
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
    this.sharedService.setTicketBtn(true)
  }

  

  
}
