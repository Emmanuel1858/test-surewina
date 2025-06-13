import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  itemsInArray: number = 0
  itemsInArrayPrevious: number = 0
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
  showTicketPayment: boolean = false;
  ticketError: boolean = false
  redeemTicketSecond: boolean = false
  redeemTicketFirst: boolean = false
  allTicket: any = []
  showMoney: boolean = false
  showLocation: boolean = false
  showEmptyOngoingTicket: boolean = false
  showEmptyPreviousTicket: boolean = false
  showEmptyCombinedTicket: boolean = false
  tabs: string = 'ongoing'
  allPreviousTicket: any[] = []
  combinedTickets: any[] = []
  unitPrice: number = 0;
  ticketCount: number = 0;
  totalPrice: number = 0;
  showMakePayment: boolean = false;
  showError: string = ''
  identifier: string = `${sessionStorage.getItem('phoneNumber')}`
  drawId: number = 1
  channel: number = 1
  loader: boolean = false


  constructor(private userTicket: UserTicketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOngoingTicket()
    this.getPreviouslyTicket()
    this.loadCombinedTickets()
  }

  switchTab(tab: string) {
    this.tabs = tab
    // console.log(this.tabs)
  }

  closeModalOnOutsideClick(event: MouseEvent): void {
    this.navigateToDashboard();
  }

  navigateToDashboard() {
    this.showMakePayment = false
    this.showTicketPayment = false
    this.loader = false
    // this.showlocationUpdate = false
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

  navigateToPaymentTicket() {
    this.showTicketPayment = true
    // this.router.navigate(['/profile'])
  }

  private updateTotalPrice(): void {
    this.totalPrice = this.ticketCount * this.unitPrice;
  }

  ticketBoughtSucess() {
    location.reload()
  }

  async navigateToModal() {
    const credentialsBuyTicket = {
      identifier: this.identifier,
      drawId: this.drawId,
      quantity: this.ticketCount,
      channel: this.channel

    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.buyTicket(credentialsBuyTicket))
      // console.log(response)
      this.showLoader = false
      if (response.responseStatus === false) {
        this.showError = response.responseMessage

      } else {
        this.loader = true
        this.showMakePayment = false
        this.showTicketPayment = false
      }
    } catch (error) {
      // debugger
      this.showLoader = true
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/login'])
      sessionStorage.clear()
      // console.log(error)
    }

  }


  navigateToMakePayment() {
    if (this.totalPrice === 0) {
      this.ticketError = true
      setTimeout(() => {
        this.ticketError = false
      }, 6000);
    } else {
      this.showMakePayment = true
      this.showTicketPayment = false
    }

  }

  closeModal() {
    this.showMakePayment = false
    this.showTicketPayment = true
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
      // console.log('testing ticket id with user')
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/login'])
      sessionStorage.clear()
      // console.log(error)
    }
  }

  // async getOngoingTicket() {
  //   // debugger
  //   const credentialGoingTicket = {
  //     pageNumber: this.pageNumber,
  //     numberOfRecords: this.numberOfRecords
  //   }
  //   try {
  //     this.showLoader = true
  //     const response = await lastValueFrom(this.userTicket.onGoingTicket(credentialGoingTicket))
  //     // console.log(response)
  //     this.showLoader = false
  //     this.itemsInArray = response.result.items.length
  //     if(this.itemsInArray === 0 ) {
  //       this.showEmptyOngoingTicket = true
  //       return 
  //     }
  //     this.amount = response.result.items[0].amount
  //     this.created = response.result.items[0].created
  //     this.drawName = response.result.items[0].drawName
  //     this.numberOfTickets = response.result.items[0].numberOfTickets
  //     this.ticketImage = response.result.items[0].ticketImage
  //     this.tierOnePrize = response.result.items[0].tierOnePrize
  //     this.tierTwoPrize = response.result.items[0].tierTwoPrize
  //     this.tierThreePrize = response.result.items[0].tierThreePrize
  //     this.allTicket = response.result.items
  //     // console.log(this.allTicket)

  //   } catch(error) {
  //     alert('You were logged out due to error. Try logging back in.');
  //     this.router.navigate(['/login'])
  //     sessionStorage.clear()
  //     // console.log(error)
  //   }
  // }




  // async getPreviouslyTicket() {

  //   const credentialGoingTicket = {
  //     pageNumber: this.pageNumber,
  //     numberOfRecords: this.numberOfRecords
  //   }
  //   try {
  //     this.showLoader = true
  //     const response = await lastValueFrom(this.userTicket.previouslyPlayedTicket(credentialGoingTicket))

  //     this.showLoader = false
  //     this.itemsInArrayPrevious = response.result.items.length
  //     if(this.itemsInArrayPrevious === 0) {
  //       this.showEmptyPreviousTicket = true
  //       return 
  //     }
  //     this.amountPrevious = response.result.items[0].amount
  //     this.createdPrevious = response.result.items[0].created
  //     this.drawNamePrevious = response.result.items[0].drawName
  //     this.numberOfTicketsPrevious = response.result.items[0].numberOfTickets
  //     this.ticketImagePrevious = response.result.items[0].ticketImage
  //     this.tierOnePrizePrevious = response.result.items[0].tierOnePrize
  //     this.tierTwoPrizePrevious = response.result.items[0].tierTwoPrize
  //     this.tierThreePrizePrevious = response.result.items[0].tierThreePrize
  //     this.allPreviousTicket = response.result.items
  //     // console.log(this.allTicket)

  //   } catch(error) {
  //     alert('You were logged out due to error. Try logging back in.');
  //     this.router.navigate(['/login'])
  //     sessionStorage.clear()
  //     // console.log(error)
  //   }
  // }

  async getOngoingTicket(): Promise<any[]> {
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }

    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.onGoingTicket(credentialGoingTicket))
      this.showLoader = false

      const items = response.result.items
      this.itemsInArray = items.length

      if (items.length === 0) {
        this.showEmptyOngoingTicket = true
        return []
      }

      const first = items[0]
      this.amount = first.amount
      this.created = first.created
      this.drawName = first.drawName
      this.numberOfTickets = first.numberOfTickets
      this.ticketImage = first.ticketImage
      this.tierOnePrize = first.tierOnePrize
      this.tierTwoPrize = first.tierTwoPrize
      this.tierThreePrize = first.tierThreePrize

      this.allTicket = items
      return items

    } catch (error) {
      debugger
      alert('An error occurred.')
      // this.router.navigate(['/login'])
      // sessionStorage.clear()
      return []
    }
  }

  async getPreviouslyTicket(): Promise<any[]> {
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }

    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.previouslyPlayedTicket(credentialGoingTicket))  // use correct method
      this.showLoader = false

      const items = response.result.items
      this.itemsInArrayPrevious = items.length

      if (items.length === 0) {
        this.showEmptyPreviousTicket = true
        return []
      }

      const first = items[0]
      this.amountPrevious = first.amount
      this.createdPrevious = first.created
      this.drawNamePrevious = first.drawName
      this.numberOfTicketsPrevious = first.numberOfTickets
      this.ticketImagePrevious = first.ticketImage
      this.tierOnePrizePrevious = first.tierOnePrize
      this.tierTwoPrizePrevious = first.tierTwoPrize
      this.tierThreePrizePrevious = first.tierThreePrize

      this.allPreviousTicket = items
      return items

    } catch (error) {
      // debugger
      alert('An error occurred')
      this.showEmptyPreviousTicket = true
      // this.router.navigate(['/login'])
      // sessionStorage.clear()
      return []
    }
  }



  async loadCombinedTickets() {
    // debugger
    const ongoing: any[] = await this.getOngoingTicket()
    const previous: any[] = await this.getPreviouslyTicket()

    this.combinedTickets = [...ongoing, ...previous]
    // debugger
    console.log('combined tickets', this.combinedTickets.length)
    if (this.combinedTickets.length === 0) {
      this.showEmptyCombinedTicket = true
    }
  }

}
