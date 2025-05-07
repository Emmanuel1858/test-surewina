import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vendor-header',
  templateUrl: './vendor-header.component.html',
  styleUrls: ['./vendor-header.component.scss']
})
export class VendorHeaderComponent implements OnInit, OnDestroy {
  inactivityTimeout: any;
  inactivityDuration = 10 * 60 * 1000;
  constructor(private router: Router) {}
  goToDashboard() {
    this.router.navigate(['/vendor-dashboard'])
  }

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
    this.router.navigate(['/login']);
  }

}
