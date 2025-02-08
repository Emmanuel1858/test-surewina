import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DrawService } from 'src/app/services/draw.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  activeHeader: string = 'dashboard';
  showMenu: boolean = false;
  showPayTicket: boolean = false
  showMakePayment: boolean = false
  showLoader: boolean = false
  ticketCount: number = 0;
  totalPrice: number = 0;
  unitPrice: number = 1000;
  initialFromLogin: string = `${sessionStorage.getItem('initialFromLogin')}`
  pageNumber: number = 1
  numberOfRecords: number = 4
  nameGame: string = ''
  items: any = []
  drawId: number = 1
  channel: number = 1
  identifier: string = `${sessionStorage.getItem('phoneNumber')}`
  ticketImage: string = ''
  showError: string = ''
  loading: boolean = false



  constructor(private router: Router, private drawService: DrawService, private userTicket: UserTicketService) { }

  ngOnInit(): void {
    this.getTodayDraw()
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'])
    this.activeHeader = 'dashboard';

  }
  navigateToDashboardMobile() {
    this.showMakePayment = false
    this.showPayTicket = true
    this.showLoader = false
  }
  navigateToTicket() {
    this.router.navigate(['/ticket-history'])
    this.activeHeader = 'ticket';
  }
  navigateToWinner() {
    this.router.navigate(['/winner-board'])
    this.activeHeader = 'winner';
  }

  
  navigateToProfile() {
    this.router.navigate(['/profile'])
  }

  completeLogout() {
    this.router.navigate(['/'])
    sessionStorage.clear()
  }


  logout() {
    this.router.navigate(['/login'])
    sessionStorage.clear()
  }


  showBuyTicketModal() {
    this.showPayTicket = true
  }

  navigateToMakePayment() {
    this.showMakePayment = true
    this.showPayTicket = false
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
      const response = await lastValueFrom(this.userTicket.buyTicket(credentialsBuyTicket))
      console.log(response)
      this.loading = false
      if (response.responseStatus === false) {
        this.showError = response.responseMessage
       
      } else {
        this.showLoader = true
        this.showMakePayment = false
        this.showPayTicket = false
      }
    } catch (error) {
      this.loading = true
      console.log(error)
    }
 
  }



  goBack() {
    this.showPayTicket = false
  }

  goToDashboard() {
    this.showMenu = true
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

  private updateTotalPrice(): void {
    this.totalPrice = this.ticketCount * this.unitPrice;
  }

  openMenu() {
    this.showMenu = true
  }

  closeMenu() {
    this.showMenu = false
  }

  showDashboard() {
    this.showMenu = false
    this.router.navigate(['/dashboard'])
  }

  showWinner() {
    this.showMenu = false
    this.router.navigate(['/winner-board'])
  }

  showTicket() {
    this.showMenu = false
    this.router.navigate(['/ticket-history'])
  }

  async getTodayDraw() {
    const drawForToday = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      const response = await lastValueFrom(this.drawService.getTodayDraw(drawForToday))
      console.log(response)
      this.items = response.result.items
      this.nameGame = response.result.items[0].name
      this.drawId = response.result.items[0].drawId
      this.ticketImage = response.result.items[0].ticketImage
      this.unitPrice = response.result.items[0].amount
    } catch (error) {
      console.log(error)
    }
  }


}
