import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserTicketService } from 'src/app/services/user-ticket.service';


@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss']
})
export class TicketHistoryComponent implements OnInit {
 
  pageNumber: number = 1
  numberOfRecords: number = 5
  amount: number = 0
  amountPrevious: number = 0
  created: string = ''
  createdPrevious: string = ''
  drawName: string = ''
  drawNamePrevious: string = ''
  numberOfTickets: number = 0
  numberOfTicketsPrevious: number = 0
  itemsInArray: number = 10
  itemsInArrayPrevious: number = 5
  numberOfWinningTickets: number = 0
  ticketImage: string = ''
  ticketImagePrevious: string = ''
  tierOnePrize: string = ''
  tierOnePrizePrevious: string = ''
  tierTwoPrize: string = ''
  tierTwoPrizePrevious: string = ''
  tierThreePrize: string = ''
  tierThreePrizePrevious: string = ''
  selectedTicketImage: string = '';
  showLoader: boolean = false
  redeemTicketSecond: boolean = false
  redeemTicketFirst: boolean = false
  allTicket: any = []
  showMoney: boolean = false
  showLocation: boolean = false
  tabs: string = 'ongoing'
  allPreviousTicket: any[] = []
  

  constructor(private userTicket: UserTicketService) {}

  ngOnInit(): void {
      this.getOngoingTicket()
      this.getPreviouslyTicket()
  }

  switchTab(tab: string) {
    this.tabs = tab
    console.log(this.tabs)
  }


  toggleMoney() {
    this.showMoney = true
    this.showLocation = false
  }

  toggleLocation() {
    this.showMoney = false
    this.showLocation = true
  }

  goToNext() {
    this.redeemTicketFirst = false
    this.redeemTicketSecond = true
  }
  async getTicketId(ticketRef: string, ticketImage: string) {
    this.selectedTicketImage = ticketImage
    this.redeemTicketFirst = true
    this.redeemTicketSecond = false
    try {
      const response = this.userTicket.getTicketById(ticketRef)
      console.log(response)
      console.log('testing ticket id with user')
    } catch (error) {
      console.log(error)
    }
  }

  async getOngoingTicket() {
    // debugger
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.onGoingTicket(credentialGoingTicket))
      console.log(response)
      this.showLoader = false
      this.itemsInArray = response.result.items.length
      if(this.itemsInArray === 0 ) {
        return
      }
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
  async getPreviouslyTicket() {
    // debugger
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.onGoingTicket(credentialGoingTicket))
      console.log(response)
      this.showLoader = false
      this.itemsInArrayPrevious = response.result.items.length
      if(this.itemsInArrayPrevious === 0) {
        return
      }
      this.amountPrevious = response.result.items[0].amount
      this.createdPrevious = response.result.items[0].created
      this.drawNamePrevious = response.result.items[0].drawName
      this.numberOfTicketsPrevious = response.result.items[0].numberOfTickets
      this.ticketImagePrevious = response.result.items[0].ticketImage
      this.tierOnePrizePrevious = response.result.items[0].tierOnePrize
      this.tierTwoPrizePrevious = response.result.items[0].tierTwoPrize
      this.tierThreePrizePrevious = response.result.items[0].tierThreePrize
      this.allPreviousTicket = response.result.items
      console.log(this.allTicket)
      
    } catch(error) {
      console.log(error)
    }
  }
}
