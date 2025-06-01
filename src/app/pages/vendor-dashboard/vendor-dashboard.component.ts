import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';
import { UserService } from 'src/app/services/user.service';

interface Prize {
  prizeId: number;
  prizeTier: number;
  name: string;
  image: string;
}

interface Draw {
  drawId: number;
  drawDescription: string;
  drawDate: string;
  totalWinners: number;
  winners: any; // Replace `any` with the correct type if needed
  prizes: Prize[];
}

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit, OnDestroy {
  bars: boolean[] = [true, false, false, false, false];
  currentIndex: number = 0;
  intervalId: any;
  backgroundImages: string[] = [
    '../../../assets/samsung-tv.svg',
    '../../../assets/yellow-paper.svg',
    '../../../assets/white-jeep.svg',
    '../../../assets/samsung-tv.svg',
    '../../../assets/yellow-paper.svg'

  ];
  currentBackgroundImage: string = this.backgroundImages[0];
  transitioning: boolean = false;
  showTicketPayment: boolean = false;
  showMakePayment: boolean = false;
  showRedeemPrize: boolean = false
  showGameInfo: boolean = true
  showLoader: boolean = false;
  showTicketRedeemSuccessfully: boolean = false
  showBalance: boolean = true;
  showMoney: boolean = false
  showLocation: boolean = true
  showRedeemWithMoneyOrPrize: boolean = false
  ticketCount: number = 0;
  totalPrice: number = 0;
  unitPrice: number = 0;
  firstName: string = `${sessionStorage.getItem('firstName')}`
  lastName: string = `${sessionStorage.getItem('lastName')}`
  phoneNumber: string = `${sessionStorage.getItem('phoneNumber')}`
  initials: string = ''
  showGameId: boolean = false
  activeContainer: string = 'location'
  sellTicketBtn: boolean = true
  customerGameId: string = ''
  loading: boolean = false
  showGameError: boolean = false
  showGameErrorBackend: string = ''
  totalNumberTicketBought: number = 0
  totalNumberPrizeWon: number = 0
  gameId: string = ''
  months: string[] = ["2025-01-01T21:25:46.511Z"]
  showAllPrize: any = []
  allTicket: any = []
  allDrawsByMonth: any = []
  tabs: string = 'jan'
  userName: string = ''
  showMonth: boolean = true
  isCovertedToMoney: boolean = false
  phoneNumberName: string = ''
  ticketUnitPrice: number = 0
  totalTicketSold: number = 0
  totalCommission: number = 0
  pageNumber: number = 1
  numberOfRecords: number = 1
  inactivityTimeout: any;
  inactivityDuration = 10 * 60 * 1000;
  noData: string = ''
  private sub!: Subscription
 
  allPrizes: { prizeId: number; prizeTier: number; name: string; image: string }[] = [];





  constructor(private router: Router, private userTicket: UserTicketService,
    private userService: UserService, private sharedService: SharedService
  ) { }

  
  ngOnInit(): void {
    this.startAutoAdvance();
    this.initials = (this.firstName?.charAt(0) || '') + (this.lastName?.charAt(0) || '');
    this.initials = this.initials.toUpperCase();
    sessionStorage.setItem('initial', this.initials)
    this.vendorDetails()
    this.getVendorTicket()
    this.showAllWinnerByMonth()
    this.sharedService.ticketBtn$.subscribe(value => {
      this.sellTicketBtn = value
    })
    // window.location.reload()

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

  navigateToProfile() {
    this.router.navigate(['/profile'])
  }

  switchTab(tab: string) {
   
    this.tabs = tab
    // console.log(this.tabs)
    switch (this.tabs) {
      case 'jan':
        this.months = ["2025-01-01T21:25:46.511Z"]
        break;
      case 'feb':
        this.months = ["2025-02-01T21:25:46.511Z"]
        break
      case 'mar':
        this.months = ["2025-03-01T21:25:46.511Z"]
        break
      case 'apr':
        this.months = ["2025-04-01T21:25:46.511Z"]
        break
      case 'may':
        this.months = ["2025-05-01T21:25:46.511Z"]
        break
      case 'jun':
        this.months = ["2025-06-01T21:25:46.511Z"]
        break
      case 'jul':
        this.months = ["2025-07-01T21:25:46.511Z"]
        break
      case 'aug':
        this.months = ["2025-08-01T21:25:46.511Z"]
        break
      case 'sept':
        this.months = ["2025-09-01T21:25:46.511Z"]
        break
      case 'oct':
        this.months = ["2025-10-01T21:25:46.511Z"]
        break
      case 'nov':
        this.months = ["2025-11-01T21:25:46.511Z"]
        break
      case 'dec':
        this.months = ["2025-12-01T21:25:46.511Z"]
        break
      default:
        break;
    }
    this.showAllWinnerByMonth()
  }

  async showAllWinnerByMonth() {
    const credentialsMonth = this.months
    try {
      // this.showLoader = true
      const response = await lastValueFrom(this.userTicket.winnerBoardByMonth(credentialsMonth))
      // console.log('Months by response:', response)
      if (!this.allDrawsByMonth) {
        this.noData = 'No Data Available right now'
      }
      this.allDrawsByMonth = response.result[0].draws as Draw[]
      this.allPrizes = this.allDrawsByMonth.map((draw: Draw) => draw.prizes).flat();

      // console.log('all prize', this.allPrizes)
      this.showLoader = false
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(error)
    }
  }

  showProfile() {
    this.router.navigate(['/profile'])
  }

  testFunc() {
    // console.log('testttttt')
  }



  navigateToAllWinner() {
    this.router.navigate(['/vendor-winner-board'])
  }
  redeemTicket() {
    this.showGameId = true
    this.sellTicketBtn = false
  }

  closeModalOnOutsideClick(event: MouseEvent): void {
    this.hideGameId();
  }

  hideGameId() {
    this.showGameId = false
    this.showGameInfo = false
  }

  closeBtn() {
    this.sellTicketBtn = false
  }

  async navigateToGameInfo() {
    if (this.customerGameId === '') {
      this.showGameError = true
      return
    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.userTicket.getPrizeWonById(this.customerGameId))
      // console.log('true response', response)
      if (response.responseStatus === false) {
        this.showGameErrorBackend = response.responseMessage
      } else {
        this.loading = false
        this.showGameInfo = true
        this.showGameId = false
        this.showAllPrize = response.result

        // this.totalNumberTicketBought = 
        this.totalNumberPrizeWon = response.result.numberOfWinningTickets
        this.userName = response.result.name
        this.phoneNumberName = response.result.phoneNumber
        this.gameId = response.result.ticketReferenceNumber
        this.totalNumberTicketBought = response.result.numberOfTickets
        this.ticketUnitPrice = response.result.ticketPrice
      }
      this.loading = false

    } catch (error: any) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(error.responseMessage)
      // console.log('false response', error)
    }

  }

  async navigateToRedeem() {
    try {
      this.loading = true
      const response = await lastValueFrom(this.userTicket.getVendorTicketById(this.customerGameId))
      // console.log('true response', response)
      this.showAllPrize = response.result
      this.loading = false
      this.showRedeemWithMoneyOrPrize = true
      this.showGameInfo = false

    } catch (error: any) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(error.responseMessage)
      // console.log('false response', error)
    }

  }

  async navigateToSucessModal() {
    // debugger
    const credentials = {
      ticketReference: this.customerGameId,
      convertedToMoney: this.showMoney
    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.userTicket.getClamWinningTicket(credentials))
      // console.log(response)
      this.loading= false
      if (response.responseStatus === true) {
        this.showRedeemWithMoneyOrPrize = false
        this.showTicketRedeemSuccessfully = true
        this.customerGameId = ''
      } else {
        this.customerGameId = ''
        return
      }
    } catch(e) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(e)
    }

  }

  closeModal() {
    this.showTicketRedeemSuccessfully = false
    this.sellTicketBtn = true

  }

  showMoneyBtn() {
    this.showMoney = true
    this.showLocation = false
    this.activeContainer = 'money'

  }

  showLocationBtn() {
    this.showLocation = true
    this.showMoney = false
    this.activeContainer = 'location'

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




  ngOnDestroy(): void {
    this.removeActivityListeners();
    clearTimeout(this.inactivityTimeout)
    this.clearAutoAdvance();
  }

  // async getTodayDraw() {
  //   const drawForToday = {
  //     pageNumber: this.pageNumber,
  //     numberOfRecords: this.numberOfRecords
  //   }
  //   try {
  //     const response = await lastValueFrom(this.drawService.getTodayDraw(drawForToday))
  //     // console.log(response)
  //     this.items = response.result.items
  //     this.nameGame = response.result.items[0].name
  //     this.drawId = response.result.items[0].drawId
  //     this.ticketImage = response.result.items[0].ticketImage
  //     this.unitPrice = response.result.items[0].amount
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  navigateToPaymentTicket() {
    this.showTicketPayment = true
    // this.router.navigate(['/profile'])
  }
  navigateToMakePayment() {
    this.showMakePayment = true
    this.showTicketPayment = false
  }
  navigateToModal() {
    this.showLoader = true
    this.showMakePayment = false
    this.showTicketPayment = false
  }
  navigateToDashboard() {
    this.showMakePayment = false
    this.showTicketPayment = false
    this.showLoader = false
  }

  showMyBalance() {
    this.showBalance = !this.showBalance
  }

  async vendorDetails() {
    try {
      const response = await lastValueFrom(this.userService.getVendorDetails())
      // console.log(response)
      this.totalTicketSold = response.result.totalTickets
      this.totalCommission = response.result.totalCommission
      sessionStorage.setItem('totalTicketSold', String(this.totalTicketSold));
      sessionStorage.setItem('totalCommission', String(this.totalCommission));
    } catch (e) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(e)
    }
  }

  async getVendorTicket() {
    const credentialGoingTicket = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      // this.showLoader = true
      const response = await lastValueFrom(this.userTicket.vendorHistoryTicket(credentialGoingTicket))
      this.showLoader = false

      // this.itemsInArray = response.result.items.length
      // this.amount = response.result.items[0].amount
      // this.created = response.result.items[0].created
      // this.drawName = response.result.items[0].drawName
      // this.numberOfTickets = response.result.items[0].numberOfTickets
      // this.ticketImage = response.result.items[0].ticketImage
      // this.tierOnePrize = response.result.items[0].tierOnePrize
      // this.tierTwoPrize = response.result.items[0].tierTwoPrize
      // this.tierThreePrize = response.result.items[0].tierThreePrize
      this.allTicket = response.result.items
      // console.log(this.allTicket)

    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log('this is my error message:', error)
    }
  }
  navigateToAllTicket() {
    this.router.navigate(['/vendor-ticket-history'])
  }

  navigateToSellTicket() {
    this.router.navigate(['/vendor-sell-ticket'])
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
