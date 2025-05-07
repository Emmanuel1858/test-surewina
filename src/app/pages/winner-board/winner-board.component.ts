import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserTicketService } from 'src/app/services/user-ticket.service';


@Component({
  selector: 'app-winner-board',
  templateUrl: './winner-board.component.html',
  styleUrls: ['./winner-board.component.scss']
})
export class WinnerBoardComponent implements OnInit {

  ticketName: any = []
  selectedTicketIndex: number | null = null
  mobileVisibility: boolean = false
  showLoader: boolean = false
  tabs: string = 'jan'
  showWinnerList: boolean = false
  showMonth: boolean = true
  listOfWinners: any = []
  noData: string = ''
  allDrawsByMonth: any = [] 
  drawResults: any[] = []


  constructor(private userTicket: UserTicketService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getWinnerBoard()
  }

  switchTab(tab: string) {
    this.tabs = tab
    // console.log(this.tabs)
  }

  // This will hold the draw data

  async getWinnerBoard() {
    try {
      this.showLoader = true;
  
      const response = await lastValueFrom(this.userTicket.winnerBoardUser());
  
      this.showLoader = false;
  
      // Save the draw data
      this.drawResults = response.result;
  
    } catch (error) {
      alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/login'])
      sessionStorage.clear()
      this.showLoader = false;
      // console.log(error);
    }
  }
  

  async showListWinners(i: number) {
    // debugger
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
      this.router.navigate(['/login'])
      sessionStorage.clear()
      // console.log(error)
    }

  }
  selectTicket(index: number) {
    this.selectedTicketIndex = index;
    this.mobileVisibility = true// Update selected ticket index
  }

  closeWinner() {
    this.mobileVisibility = false
  }
}
