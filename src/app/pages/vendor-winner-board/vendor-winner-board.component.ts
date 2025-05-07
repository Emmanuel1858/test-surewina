import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserTicketService } from 'src/app/services/user-ticket.service';

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
  selector: 'app-vendor-winner-board',
  templateUrl: './vendor-winner-board.component.html',
  styleUrls: ['./vendor-winner-board.component.scss']
})


export class VendorWinnerBoardComponent implements OnInit, OnDestroy{
  allDrawsByMonth: any = []
  selectedTicketIndex: number | null = null
  mobileVisibility: boolean = true
  showLoader: boolean = false
  showMenu: boolean = false;
  tabs: string = 'jan'
  months: string[] =["2025-01-01T21:25:46.511Z"]
  showWinnerList: boolean = false
  showMonth: boolean = true
  listOfWinners: any = []
  allPrizes: { prizeId: number; prizeTier: number; name: string; image: string }[] = [];
  currentPrizeIndex = 0;
  noData: string = ''
  inactivityTimeout: any;
  inactivityDuration = 10 * 60 * 1000;

  

  constructor(private userTicket: UserTicketService, private router:Router){

  }

  ngOnInit(): void {
      this.getWinnerBoard()
      this.showAllWinnerByMonth()
      this.showAllWinnerByMonth()
      this.resetInactivityTimer();
      this.addActivityListeners();
  }

  ngOnDestroy(): void {
    this.removeActivityListeners();
    clearTimeout(this.inactivityTimeout)
  }

  switchTab(tab: string) {
    this.tabs = tab
    // console.log(this.tabs)
    switch (this.tabs) {
      case 'jan':
        this.months = ["2025-01-01T21:25:46.511Z"]
        break;
      case 'feb': 
        this.months = [ "2025-02-01T21:25:46.511Z" ]
        break
      case 'mar':
        this.months = [ "2025-03-01T21:25:46.511Z" ]
        break
      case 'apr': 
        this.months = [ "2025-04-01T21:25:46.511Z" ]
        break
      case 'may': 
        this.months = [ "2025-05-01T21:25:46.511Z" ]
        break
      case 'jun': 
        this.months = [ "2025-06-01T21:25:46.511Z" ]
        break
      case 'jul': 
        this.months = [ "2025-07-01T21:25:46.511Z" ]
        break
      case 'aug': 
        this.months = [ "2025-08-01T21:25:46.511Z" ]
        break
      case 'sept': 
        this.months = [ "2025-09-01T21:25:46.511Z" ]
        break
      case 'oct': 
        this.months = [ "2025-10-01T21:25:46.511Z" ]
        break
      case 'nov': 
        this.months = [ "2025-11-01T21:25:46.511Z" ]
        break
      case 'dec':
        this.months = [ "2025-12-01T21:25:46.511Z" ]
        break
      default:
        break;
    }
    this.showAllWinnerByMonth()
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

  openMenu() {
    this.showMenu = true
  }

  logout() {
    this.router.navigate(['/vendor-login'])
    sessionStorage.clear()
  }
  showDashboard() {
    this.showMenu = false
    this.router.navigate(['/vendor-dashboard'])
  }

  showWinner() {
    this.showMenu = false
    this.router.navigate(['/vendor-winner-board'])
  }

  showTicket() {
    this.showMenu = false
    this.router.navigate(['/vendor-ticket-history'])
  }
  navigateToProfile() {
    this.router.navigate(['/vendor-profile'])
  }

  closeMenu() {
    this.showMenu = false
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
      // console.log(response)
      this.showLoader = false
      this.listOfWinners = response.result.items
      this.showWinnerList = true
      this.showMonth = false
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(error)
    }

  }

  async getWinnerBoard() {
    try {
      this.showLoader = false
      const response = await lastValueFrom(this.userTicket.winnerBoard())
      // console.log(response)
      this.showLoader = false
      // this.ticketName = response.result
     
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
    //  console.log(error)
    }
  }


  selectTicket(index: number) {
    this.selectedTicketIndex = index; 
    this.mobileVisibility = false// Update selected ticket index
  }

  closeWinner() {
   this.router.navigate(['/vendor-dashboard'])
  }

  showTheMonth() {
    this.showWinnerList = false 
    this.showMonth = true
  }



  async showAllWinnerByMonth() {
    const credentialsMonth = this.months
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.winnerBoardByMonth(credentialsMonth))
      // console.log('Months by response:', response)
      if(!this.allDrawsByMonth) {
        this.noData = 'No Data Available right now'
      }
      this.allDrawsByMonth = response.result[0].draws as Draw[]
      this.allPrizes = this.allDrawsByMonth.map((draw: Draw) => draw.prizes).flat();

      // console.log('all prize', this.allPrizes)
      this.showLoader = false
    } catch(error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
      // console.log(error)
    }
  }

  get currentPrize() {
    return this.allPrizes.length > 0 ? this.allPrizes[this.currentPrizeIndex] : null;
  }

  showNextPrize() {
    if (this.allPrizes.length > 0) {
      this.currentPrizeIndex = (this.currentPrizeIndex + 1) % this.allPrizes.length;
    }
  }

  showPreviousPrize() {
    if (this.allPrizes.length > 0) {
      this.currentPrizeIndex = (this.currentPrizeIndex - 1 + this.allPrizes.length) % this.allPrizes.length;
    }
  }
}
