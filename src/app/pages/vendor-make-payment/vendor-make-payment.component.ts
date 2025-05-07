import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserAccountService } from 'src/app/services/user-account.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';

@Component({
  selector: 'app-vendor-make-payment',
  templateUrl: './vendor-make-payment.component.html',
  styleUrls: ['./vendor-make-payment.component.scss']
})
export class VendorMakePaymentComponent implements OnInit, OnDestroy {

  channel: number = 1
  phoneNumber: string = `${sessionStorage.getItem('phoneNumber')}`
  drawId: number = Number(sessionStorage.getItem('drawId'))
  ticketCount: number = Number(sessionStorage.getItem('quantity'))
  showModal: boolean = false
  loading: boolean = false
  ifAlert: boolean = false
  ifCash: boolean = true
  showError: string = ''
  inactivityTimeout: any;
  inactivityDuration = 10 * 60 * 1000;

  constructor( private userTicket: UserTicketService, private router: Router) { }

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

  navigateToVendorSellTicket() {
    this.router.navigate(['/vendor-sell-ticket'])
  }

  showCash() {
    this.ifCash = true
    this.ifAlert = false
  }

  showAlert() {
    this.ifAlert = true
    this.ifCash = false
  }

  async navigateToModal() {
    const credentialsBuyTicket = {
      identifier: this.phoneNumber,
      drawId: this.drawId,
      quantity: this.ticketCount,
      channel: this.channel

    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.userTicket.buyTicketVendor(credentialsBuyTicket))
      // console.log(response)
      this.loading = false
      if (response.responseStatus === false) {
        this.showError = response.responseMessage

      } else {
        this.showModal = true
      }
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // this.loading = true
      // console.log(error)
    }

  }

  goToDashboard() {
    this.router.navigate(['/vendor-dashboard'])
  }
}
