import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { DrawService } from 'src/app/services/draw.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  activeHeader: string = 'dashboard';
  notActiveState: boolean = false
  activeState: boolean = true
  notActiveStateTicket: boolean = true
  activeStateTicket: boolean = false
  private sub!: Subscription;
  private subWinner!: Subscription;
  showMenu: boolean = false;
  showPayTicket: boolean = false
  showMakePayment: boolean = false
  showLoader: boolean = false
  ticketCount: number = 0;
  totalPrice: number = 0;
  unitPrice: number = 0;
  initialFromLogin: string = `${sessionStorage.getItem('initialFromLogin')}`
  pageNumber: number = 1
  numberOfRecords: number = 4
  ticketError: boolean = false
  nameGame: string = ''
  items: any = []
  drawId: number = 1
  channel: number = 1
  identifier: string = `${sessionStorage.getItem('phoneNumber')}`
  ticketImage: string = ''
  showError: string = ''
  loading: boolean = false
  inactivityTimeout: any;
  inactivityDuration = 15 * 60 * 1000;
  showMobileBtn: boolean = true
  showLogout: boolean = false
  logoutModalLaptop: boolean = false

  constructor(private router: Router,
    private drawService: DrawService,
    private userTicket: UserTicketService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    // this.showMobileBtn = true
    this.resetInactivityTimer();
    this.addActivityListeners();
    const savedHeader = sessionStorage.getItem('activeHeader');
    if (savedHeader) {
      this.activeHeader = savedHeader;
    }

    this.sub = this.sharedService.action$.subscribe(() => {
      this.navigateToTicket()
    })
    this.subWinner = this.sharedService.actionsWinnerBoard$.subscribe(() => {
      this.navigateToWinner()
    })
    this.getTodayDraw()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.removeActivityListeners();
    clearTimeout(this.inactivityTimeout)
    this.subWinner.unsubscribe()
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
    this.router.navigate(['/login']);
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
    this.setActiveHeader('dashboard');
  }
  
  navigateToTicket() {
    this.router.navigate(['/ticket-history']);
    this.setActiveHeader('ticket');
  }
  
  navigateToWinner() {
    this.router.navigate(['/winner-board']);
    this.setActiveHeader('winner');
  }

  setActiveHeader(header: string) {
    this.activeHeader = header;
    sessionStorage.setItem('activeHeader', header);
  }

  navigateToDashboardMobile() {
    this.showMakePayment = false
    this.showPayTicket = true
    this.showLoader = false
  }



  navigateToProfile() {
    this.router.navigate(['/profile'])
  }

  completeLogout() {
    this.router.navigate(['/profile'])
    sessionStorage.clear()
  }


  logout() {
    // debugger
    this.showLogout = true
    this.showMobileBtn = false
    this.showMenu = false
    // this.router.navigate(['/login'])
  }

  showLogoutLaptop() {
    this.logoutModalLaptop = true
  }

  yesLogout() {
    this.router.navigate(['/login'])
    sessionStorage.clear()
  }

  goBackLaptop() {
    this.logoutModalLaptop = false
  }

  cancel() {
    this.showMenu = true
    this.showLogout = false
    this.showMobileBtn = false
  }

  showBuyTicketModal() {
    this.showMobileBtn = false
    this.showPayTicket = true
  }

  navigateToMakePayment() {
    if(this.totalPrice === 0) {
      this.ticketError = true
      setTimeout(() => {
        this.ticketError = false
      }, 6000);
    } else {
      this.showMakePayment = true
      this.showPayTicket = false
    }

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
      // console.log(response)
      this.loading = false
      if (response.responseStatus === false) {
        this.showError = response.responseMessage
        
      } else {
        this.showLoader = true
        this.showMakePayment = false
        this.showPayTicket = false
      }
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/login'])
      sessionStorage.clear()
      // console.log(error)
    }

  }



  goBack() {
    this.showMobileBtn = true
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
    this.showMobileBtn = false
  }

  closeMenu() {
    this.showMenu = false
    this.showMobileBtn = true
  }

  showDashboard() {
    this.showMenu = false
    this.showMobileBtn = true
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
