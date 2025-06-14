import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { PrizeService } from 'src/app/services/prize.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  tabs: string = 'prizes'; 
  ctaPosition: number = 1;
  h2ctaText: string = 'Setup a draw';
  pctaText: string = 'Schedule monthly or weekly draws';
  images: string[] = [
    '../../../assets/Property 1=CTA Card - Setup a draw.svg',
    '../../../assets/Property 1=CTA Card - Create a Ticket.svg',
    '../../../assets/Property 1=Variant3.svg'
  ];

  imgSrc: string = this.images[0]; 
  currentIndex: number = 0;
  getAllPrizeArray: any = []
  intervalId: any;
  loading: boolean = false
  winnersBoardTotalCount: number = 0
  currentRoute: string = 'Your Dashboard'
  userName: string = `${sessionStorage.getItem('fullname')}`;
  userEmail: string = `${sessionStorage.getItem('userEmail')}`;
  totalTicketSold: string = '0'
  prizeWon: string = '0'
  summaryByChannel: any = []
  winnersBoard: any = []

  constructor(private analyticsService: AnalyticsService,
    private prizeService:PrizeService, 
    private userTicketService: UserTicketService
  ){}

  ngOnInit() { 
    this.getAnalytics()
    this.startImageRotation();
    this.getAllPrize()
    this.getAllWinner()
  }

  startImageRotation() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.imgSrc = this.images[this.currentIndex];
    }, 5000); 
  }

  switchTab(tab: string) {
    this.tabs = tab;
  }

  // this cannot work cause designer did not export the necessary files
  // need to export items in a particular way

  setUpDraw() {
    
  }

  async getAnalytics() {
    // debugger
    try {
      this.loading = true
      const response = await this.analyticsService.analyticsAdmin().toPromise()
      // debugge
      this.loading = false
      if (response.responseStatus === true ) {
        // console.log(response)
        this.totalTicketSold = response.result.overallSummary.totalTickets
        this.prizeWon = response.result.overallSummary.totalAmount
        this.summaryByChannel = response.result.summaryByChannel
      } else {
        this.totalTicketSold = '0'
        this.prizeWon = '0'
        this.summaryByChannel = []
      }

    } catch(error) {
      // console.log
    }

  }

  allPrizes = Array.from({ length: 20 }, (_, i) => ({
    date: 'Jan 1st - Jan 14th',
    // title: `Prize ${i + 1}: 2 units of White Jeep Cherokee Suv 2024`,
    description: 'January Suprize Lottery',
    price: '₦ 1,000 per ticket',
    tickets: '11,762 tickets bought',
    image: 'assets/car-prize.png'
  }));

  currentPage = 1;
  itemsPerPage = 5;

  get paginatedPrizes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.getAllPrizeArray.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  // total pages for prizes
  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.getAllPrizeArray.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  get paginatedWinners() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.winnersBoard.slice(start, start + this.itemsPerPage);
  }

  // changePageWinner(page: number) {
  //   this.currentPage = page;
  // }
  // total pages for winners
  get totalPagesWinner(): number[] {
    return Array.from({ length: Math.ceil(this.winnersBoardTotalCount / this.itemsPerPage) }, (_, i) => i + 1);
  }

  async getAllPrize() {
    try {
      const response = await lastValueFrom(this.prizeService.getAllPrize());
      const result = response.result;
  
      const processed = result.map((prize: any) => {
        if (typeof prize.image === 'string' && prize.image.startsWith('data:image')) {
          return prize;
        }
  
        // If it's a base64 string without the header, add the prefix
        if (typeof prize.image === 'string') {
          return {
            ...prize,
            image: `data:image/png;base64,${prize.image}`, // change to jpeg if needed
          };
        }
  
        return prize;
      });
  
      this.getAllPrizeArray = processed;
      // this.numberOfPrize = processed.length;
  
    } catch (e) {
      // console.log(e);
    }
  }

  async getAllWinner() {
    // debugger
    try {
      this.loading = true
      const response = await lastValueFrom(this.userTicketService.winnerBoardAdmin())
      this.loading = false
      // console.log(response)
      this.winnersBoard = response.result[0].winners.items
      this.winnersBoardTotalCount = response.result[0].winners.totalCount
    } catch (e) {
      // console.log(e)
    }
  }


}


