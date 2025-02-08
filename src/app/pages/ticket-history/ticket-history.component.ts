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

  constructor(private userTicket: UserTicketService) {}

  ngOnInit(): void {
      this.getOngoingTicket()
  }

  async getOngoingTicket() {
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.onGoingTicket(credentialGoingTicket))
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
