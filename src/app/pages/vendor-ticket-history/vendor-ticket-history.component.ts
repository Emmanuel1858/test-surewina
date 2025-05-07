import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserTicketService } from 'src/app/services/user-ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vendor-ticket-history',
  templateUrl: './vendor-ticket-history.component.html',
  styleUrls: ['./vendor-ticket-history.component.scss']
})
export class VendorTicketHistoryComponent implements OnInit, OnDestroy {
  showTicketDetails: boolean = false
  showMenu: boolean = false;
  pageNumber: number = 1
  numberOfRecords: number = 5
  amount: number = 0
  created: string = ''
  drawName: string = ''
  numberOfTickets: number = 0
  itemsInArray: number = 10
  numberOfWinningTickets: number = 0
  ticketImage: string = ''
  tierOnePrize: string = ''
  tierTwoPrize: string = ''
  tierThreePrize: string = ''
  showLoader: boolean = false
  allTicket: any = []
  totalTicketSold: number = 0
  totalCommission: number = 0
  inactivityTimeout: any;
  inactivityDuration = 10 * 60 * 1000;
  constructor(private router: Router, private userService: UserService, private userTicket: UserTicketService) { }

  ngOnInit(): void {
    this.getVendorTicket()
    this.vendorDetails()
    this.resetInactivityTimer();
    this.addActivityListeners();
  }

  
  ngOnDestroy(): void {
    this.removeActivityListeners();
    clearTimeout(this.inactivityTimeout)
  }

  openMenu() {
    this.showMenu = true
  }
  logout() {
    this.router.navigate(['/vendor-login'])
    sessionStorage.clear()
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

  
  async vendorDetails() {
    try {
      const response = await lastValueFrom(this.userService.getVendorDetails())
      // console.log(response)
      this.totalTicketSold = response.result.totalTickets
      this.totalCommission = response.result.totalCommission
    } catch (e) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(e)
    }
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
  async getVendorTicket() {
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.vendorHistoryTicket(credentialGoingTicket))
      this.showLoader = false
      
      this.itemsInArray = response.result.items.length
      this.amount = response.result.items[0].amount
      this.created = response.result.items[0].created
      this.drawName = response.result.items[0].drawName
      this.numberOfTickets = response.result.items[0].numberOfTickets
      this.ticketImage = response.result.items[0].ticketImage
      this.tierOnePrize = response.result.items[0].tierOnePrize
      this.tierTwoPrize = response.result.items[0].tierTwoPrize
      this.tierThreePrize = response.result.items[0].tierThreePrize
      this.allTicket = response.result.items
      // console.log(this.allTicket)

    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log('this is my error message:',error)
    }
  }

  async getTicketId(ticketRef: string) {
    try {
      const response = this.userTicket.getVendorTicketById(ticketRef)
      // console.log(response)
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(error)
    }
  }
}
