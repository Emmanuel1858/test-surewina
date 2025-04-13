import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DrawService } from 'src/app/services/draw.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';
import { WinnerBoardComponent } from '../winner-board/winner-board.component';

// import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  showTicketPayment: boolean = false
  showMakePayment: boolean = false
  showLoader: boolean = false
  identifier: string = ''
  drawId: number = 1
  channel: number = 1
  loading: boolean = false 
  showAddressError: boolean = false
  showTicketError: boolean = false
  pageNumber: number = 1;
  showError: string = ''
  numberOfRecords: number = 4;
  unitPrice: number = 0
  ticketCount: number = 0;
  totalPrice: number = 0;

  constructor(private router: Router, private drawService:DrawService, private userTicket:UserTicketService ){}

  ngOnInit(): void {
      this.getTodayDraw()
  }

  
  increment(): void {
    if (this.ticketCount < 10) {
      this.ticketCount++;
      // console.log('add')
      this.updateTotalPrice();
    }
  }

  decrement(): void {
    if (this.ticketCount > 0) {
      this.ticketCount--;
      this.updateTotalPrice();
    }
  }

  private updateTotalPrice(): void {
    this.totalPrice = this.ticketCount * this.unitPrice;
  }

  async getTodayDraw() {

    const drawForToday = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      // this.loading = true
      const response = await lastValueFrom(this.drawService.getTodayDrawWithoutToken(drawForToday))
      // console.log(response)
      this.loading = false
      this.drawId = response.result.items[0].drawId
      this.unitPrice = response.result.items[0].amount
    } catch (error) {
      // this.loading = true
      console.log(error)
    }
  }

  navigateToCreatAccount() {
    this.router.navigate(['/select-your-profile'])
  }

  navigateToPaymentTicket() {
    this.showTicketPayment = true
  }
  navigateToMakePayment() {
    if (this.identifier === '') {
      this.showAddressError = true
      return
    }
    if (this.totalPrice === 0) {
      this.showTicketError = true
      return
    }
    this.showMakePayment = true
    this.showTicketPayment = false
  }
  async navigateToModal() {

    const credentialsBuyTicket = {
      identifier: this.identifier,
      drawId: this.drawId,
      quantity: this.ticketCount,
      channel: this.channel

    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.userTicket.buyTicketWeb(credentialsBuyTicket))
      console.log(response)
      this.loading = false
      if (response.responseStatus === false) {
        this.showError = response.responseMessage
       
      } else {
        this.showLoader = true
        this.showMakePayment = false
        this.showTicketPayment = false
      }
    } catch (error) {
      this.loading = true
      console.log(error)
    }
 
  }
  navigateToDashboard() {
    this.showMakePayment = false
    this.showTicketPayment = false
    this.showLoader = false 
  }

}


