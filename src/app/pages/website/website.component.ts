import { Component, OnInit, OnDestroy } from '@angular/core';
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

// export class WebsiteComponent {

// }
export class WebsiteComponent implements OnInit, OnDestroy {
  showTicketPayment: boolean = false
  showMakePayment: boolean = false
  showLoader: boolean = false
  showMenu: boolean = false;
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
  currentIndex: number = 0;
  intervalId: any;
  currentImage: string = 'assets/home_page_image.svg';
  secondCurrentImage: string = 'assets/home_page_image_second.svg';
  giftIcon: string = 'assets/sure_winna_gift_icon.svg'
  giftIconIndex: number = 0;
  giftIconIntervalId: any;
  secondGiftIcon: string = 'assets/gifts-icon.svg'
  secondGiftIndex: number = 0
  secondGiftIconIntervalId: any
  imageIndex: number = 0;
  secondImageIndex: number = 0
  imageIntervalId: any;
  secondImageIntervalId: any;
  backgroundImages: string[] = [
    // '../../../assets/white jeep.svg', 
    '../../../assets/bike-prize.svg',
    '../../../assets/samsung-tv.svg',
    '../../../assets/yellow-paper.svg'
  ];
  currentBackgroundImage: string = this.backgroundImages[0];
  images: string[] = []
  transitioning: boolean = false;
  stepsToRegister: any[] = [{
    step: '1',
    name: 'Create Account',
    desc: 'Fill in the required details to set up your account '
  }, {
    step: '2',
    name: 'Buy Ticket',
    desc: 'Select and purchase tickets according to availability'
  }, {
    step: '3',
    name: 'Win Big Prizes',
    desc: 'Start winning big prizes'
  }]


  constructor(private router: Router, private drawService: DrawService, private userTicket: UserTicketService) { }

  ngOnInit(): void {
    this.getTodayDraw()
    this.startAutoAdvance();
    this.firstImage()
    this.secondImage()
    this.firstIcon()
    this.secondIcon()
    sessionStorage.clear()
  }

  firstImage() {
    this.imageIntervalId = setInterval(() => {
      this.imageIndex = (this.imageIndex + 1) % 2;
      this.currentImage = this.imageIndex === 0
        ? 'assets/home_page_image.svg'
        : 'assets/home_page_image_second.svg';
    }, 5000);
  }

  secondImage() {
    this.secondImageIntervalId = setInterval(() => {
      this.secondImageIndex = (this.secondImageIndex + 1) % 2;
      this.secondCurrentImage = this.secondImageIndex === 0
        ? 'assets/home_page_image_second.svg'
        : 'assets/home_page_image.svg'
    }, 5000)
  }

  firstIcon() {
    this.giftIconIntervalId = setInterval(() => {
      this.giftIconIndex = (this.giftIconIndex + 1) % 2;
      this.giftIcon = this.giftIconIndex === 0
        ? 'assets/sure_winna_gift_icon.svg'
        : 'assets/gifts-icon.svg'
    }, 5000)
  }

  selectYourProfile() {
    this.router.navigate(['/select-your-profile'])
  }

  secondIcon() {
    this.secondGiftIconIntervalId = setInterval(() => {
      this.secondGiftIndex = (this.secondGiftIndex + 1) % 2;
      this.secondGiftIcon = this.secondGiftIndex === 0
        ? 'assets/gifts-icon.svg'
        : 'assets/sure_winna_gift_icon.svg'
    }, 5000)
  }

  openMenu() {
    this.showMenu = true
  }

  closeMenu() {
    this.showMenu = false
    // this.showMobileBtn = true
  }
  goNext(): void {
    // console.log('xbjon;')
    // debugger
    if (this.currentIndex < this.backgroundImages.length) {
      this.currentIndex++;
      this.updateBackgroundImage();
    }
    this.resetAutoAdvance();
  }


  goPrev(): void {
    if (this.currentIndex > 0) {
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
      this.loading = true
      const response = await lastValueFrom(this.drawService.getTodayDrawWithoutToken(drawForToday))
      // console.log(response)
      this.loading = false
      this.drawId = response.result.items[0].drawId
      this.unitPrice = response.result.items[0].amount
    } catch (error) {
      // this.loading = true
      // console.log(error)
    }
  }

  navigateToCreatAccount() {
    this.router.navigate(['/select-your-profile'])
  }

  navigateToPaymentTicket() {
    this.showTicketPayment = true
  }
  navigateToMakePayment() {
    // if (this.identifier === '') {
    //   this.showAddressError = true
    //   setTimeout(() => {
    //     this.showAddressError = false
    //   }, 6000);

    //   return
    // }
    if (this.totalPrice === 0) {
      this.showTicketError = true
      setTimeout(() => {
        this.showTicketError = false
      }, 6000);
      return
    }
    this.showMakePayment = true
    this.showTicketPayment = false
  }
  async navigateToModal() {

    if (this.identifier === '') {
      this.showAddressError = true
      setTimeout(() => {
        this.showAddressError = false
      }, 6000);

      return
    }

    const credentialsBuyTicket = {
      identifier: this.identifier,
      drawId: this.drawId,
      quantity: this.ticketCount,
      channel: this.channel

    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.userTicket.buyTicketWeb(credentialsBuyTicket))
      // console.log(response)
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
      // console.log(error)
    }

  }
  closeModalOnOutsideClick(event: MouseEvent): void {
    this.navigateToDashboard();
  }

  navigateToTicketPayment() {
    this.showMakePayment = false
    this.showTicketPayment = true
  }

  navigateToDashboard() {
    this.showMakePayment = false
    this.showTicketPayment = false
    this.showLoader = false
  }

  ngOnDestroy(): void {
    if (this.secondImageIntervalId) {
      clearInterval(this.secondImageIntervalId);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}


