import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DrawService } from 'src/app/services/draw.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';


@Component({
  selector: 'app-vendor-sell-ticket',
  templateUrl: './vendor-sell-ticket.component.html',
  styleUrls: ['./vendor-sell-ticket.component.scss']
})
export class VendorSellTicketComponent implements OnInit, OnDestroy {

  ticketCount: number = 0;
  totalPrice: number = 0;
  drawId: number = 1;
  channel: number = 1;
  unitPrice: number = 0;
  pageNumber: number = 1;
  numberOfRecords: number = 1;
  loading: boolean = false;
  showEmptyError: boolean = false;
  showZeroError: boolean = false
  showError: string = ''
  phoneNumber: string = ''
  email: string = ''
  inactivityTimeout: any;
  inactivityDuration = 10 * 60 * 1000;

  constructor(private router: Router, private userTicket: UserTicketService, private drawService: DrawService) { }

  ngOnInit(): void {
      this.getTodayDraw()
      this.resetInactivityTimer();
      this.addActivityListeners();
  }

  ngOnDestroy(): void {
    this.removeActivityListeners();
    clearTimeout(this.inactivityTimeout)
    sessionStorage.setItem('phoneNumber', this.phoneNumber)
    sessionStorage.setItem('drawId', String(this.drawId))
    sessionStorage.setItem('quantity', String(this.ticketCount))
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

  naviagteToVendorDashboard() {
    this.router.navigate(['/vendor-dashboard'])
  }

  private updateTotalPrice(): void {
    this.totalPrice = this.ticketCount * this.unitPrice;
  }

  increment(): void {
    if (this.ticketCount < 10) {
      this.ticketCount++;
      this.updateTotalPrice();
    }
  }

  decrement(): void {
    if (this.ticketCount > 0) {
      this.ticketCount--;
      this.updateTotalPrice();
    }
  }

  async getTodayDraw() {
    const drawForToday = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      const response = await lastValueFrom(this.drawService.getTodayDrawVendor(drawForToday))
      // console.log(response)

      this.drawId = response.result.items[0].drawId
      this.unitPrice = response.result.items[0].amount
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(error)
    }
  }

   navigateToPayment() {
    if (this.phoneNumber === '') {
      this.showEmptyError = true
      setTimeout(() => {
        this.showEmptyError = false
      }, 5000);
      
      return
    }

    if (this.totalPrice === 0) {
      this.showZeroError = true
      setTimeout(() => {
        this.showZeroError = false
      }, 5000);
      return
    }

    this.router.navigate(['/vendor-make-payment'])
  }
}
