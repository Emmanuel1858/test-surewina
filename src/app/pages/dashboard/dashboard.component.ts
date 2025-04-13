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
  unitPrice: number = 0;
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
  showButtonTicket: boolean = true
  itemsInArrayPrevious: number = 5
  amountPrevious: number = 0
  createdPrevious: string = ''
  drawNamePrevious: string = ''
  numberOfTicketsPrevious: number = 0
  ticketImagePrevious: string = ''
  tierOnePrizePrevious: string = ''
  tierTwoPrizePrevious: string = ''
  tierThreePrizePrevious: string = ''
  allPreviousTicket: any[] = []
  allTicket: any = []
  tabs: string = 'jan'
  drawResults: any[] = []
  showMonth: boolean = true
  listOfWinners: any = []
  showWinnerList: boolean = false
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
    this.getPreviouslyTicket()
    this.initials = (this.firstName?.charAt(0) || '') + (this.lastName?.charAt(0) || '');
    this.initials = this.initials.toUpperCase();
    sessionStorage.setItem('initial', this.initials)
    this.getWinnerBoard()
    // window.location.reload()

  }

  ngOnDestroy(): void {
    this.clearAutoAdvance();
  }

  switchTab(tab: string) {
    this.tabs = tab
    console.log(this.tabs)
  }

  async getTodayDraw() {
    // debugger
    const drawForToday = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      const response = await lastValueFrom(this.drawService.getTodayDraw(drawForToday))
      // console.log(response)
      this.items = response.result.items
      if (this.items.length === 0) {
        this.showButtonTicket = false
        return
      }
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

  
  async getWinnerBoard() {
    try {
      // this.showLoader = true;
  
      const response = await lastValueFrom(this.userTicket.winnerBoardUser());
  
      this.showLoader = false;
  
      // Save the draw data
      this.drawResults = response.result;
  
    } catch (error) {
      this.showLoader = false;
      console.log(error);
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

  async getPreviouslyTicket() {
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      // this.showLoader = true
      const response = await lastValueFrom(this.userTicket.onGoingTicket(credentialGoingTicket))
      console.log(response)
      this.showLoader = false
      this.itemsInArrayPrevious = response.result.items.length
      if (this.itemsInArrayPrevious === 0) {
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
      this.allPreviousTicket = response.result.items[0]


    } catch (error) {
      console.log(error)
    }
  }

  async showListWinners(i: number) {
    const credentials = {
      pageNumber: 1, 
      numberOfRecords: 10,
      drawId: i
    }
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.getWinnerByDrawId(credentials))
      console.log(response)
      this.showLoader = false
      this.listOfWinners = response.result.items
      this.showWinnerList = true
      this.showMonth = false
    } catch (error) {
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
