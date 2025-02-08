import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DrawService } from 'src/app/services/draw.service';
import { PrizeService } from 'src/app/services/prize.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  bars: boolean[] = [];
  currentIndex: number = 0;
  intervalId: any;
  images: string[] = []
  backgroundImages: string[] = [

  ];
  currentBackgroundImage: string = this.backgroundImages[0];
  transitioning: boolean = false;
  showTicketPayment: boolean = false;
  showMakePayment: boolean = false;
  showLoader: boolean = false;
  showBalance: boolean = true;
  ticketCount: number = 0;
  totalPrice: number = 0;
  unitPrice: number = 1000;
  firstName: string = `${sessionStorage.getItem('firstName')}`
  lastName: string = `${sessionStorage.getItem('lastName')}`
  phoneNumber: string = `${sessionStorage.getItem('phoneNumber')}`
  // address: any = `${sessionStorage.getItem('address')}`
  address = sessionStorage.getItem('address') === 'true';

  initials: string = ''
  pageNumber: number = 1;
  showError: string = ''
  numberOfRecords: number = 4;
  identifier: string = `${sessionStorage.getItem('phoneNumber')}`
  drawId: number = 1
  channel: number = 1
  loading: boolean = false
  nameGame: string = ''
  ticketImage: string = ''
  items = []

  constructor(private router: Router, private drawService: DrawService, private prizeService: PrizeService, private userTicket: UserTicketService) { }

  navigateToProfile() {
    this.router.navigate(['/profile'])
  }

  showProfile() {
    this.router.navigate(['/profile'])
  }

  testFunc() {
    console.log('testttttt')
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



  ngOnInit(): void {
    this.startAutoAdvance();
    this.getTodayDraw();
    this.getAllPrize();
    this.initials = (this.firstName?.charAt(0) || '') + (this.lastName?.charAt(0) || '');
    this.initials = this.initials.toUpperCase();
    sessionStorage.setItem('initial', this.initials)
    // window.location.reload()

  }

  ngOnDestroy(): void {
    this.clearAutoAdvance();
  }

  async getTodayDraw() {
    const drawForToday = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      const response = await lastValueFrom(this.drawService.getTodayDraw(drawForToday))
      // console.log(response)
      this.items = response.result.items
      this.nameGame = response.result.items[0].name
      this.drawId = response.result.items[0].drawId
      this.ticketImage = response.result.items[0].ticketImage
      this.unitPrice = response.result.items[0].amount
    } catch (error) {
      console.log(error)
    }
  }

  async getAllPrize() {
    try {
      const response = await lastValueFrom(this.prizeService.getAllPrize())
      console.log(response.result)
      this.backgroundImages = response.result.map((prize: any) => prize.image)
      const length = this.backgroundImages.length
      this.bars = Array(length).fill(false)
      this.bars[0] = true
      console.log(this.backgroundImages)
    } catch (error) {
      console.log(error)
    }
  }

  navigateToPaymentTicket() {
    this.showTicketPayment = true
    // this.router.navigate(['/profile'])
  }
  navigateToMakePayment() {
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
      const response = await lastValueFrom(this.userTicket.buyTicket(credentialsBuyTicket))
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

  showMyBalance() {
    this.showBalance = !this.showBalance
  }


  goNext(): void {
    if (this.currentIndex < this.bars.length - 1) {
      this.currentIndex++;
      this.bars[this.currentIndex] = true;
      this.updateBackgroundImage();
    }
    this.resetAutoAdvance();
  }


  goPrev(): void {
    if (this.currentIndex > 0) {
      this.bars[this.currentIndex] = false;
      this.currentIndex--;
      this.updateBackgroundImage();
    }
    this.resetAutoAdvance();
  }


  startAutoAdvance(): void {
    this.intervalId = setInterval(() => {
      this.goNext();
    }, 13000);
  }


  clearAutoAdvance(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  resetAutoAdvance(): void {
    this.clearAutoAdvance();
    this.startAutoAdvance();
  }

  updateBackgroundImage(): void {
    this.currentBackgroundImage = this.backgroundImages[this.currentIndex];
  }


  startTransition(callback: () => void): void {
    this.transitioning = true;
    setTimeout(() => {
      callback();
      this.transitioning = false;
    }, 800); // Match the CSS transition duration
  }


}
