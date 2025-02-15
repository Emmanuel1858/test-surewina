import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserTicketService } from 'src/app/services/user-ticket.service';

@Component({
  selector: 'app-vendor-ticket-history',
  templateUrl: './vendor-ticket-history.component.html',
  styleUrls: ['./vendor-ticket-history.component.scss']
})
export class VendorTicketHistoryComponent implements OnInit {
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
  constructor(private router: Router, private userTicket: UserTicketService){}

  ngOnInit(): void {
      this.getVendorTicket()
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
  async getVendorTicket() {
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.vendorHistoryTicket(credentialGoingTicket))
      // console.log(response)
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
      console.log(this.allTicket)
      
    } catch(error) {
      console.log(error)
    }
  }
}
