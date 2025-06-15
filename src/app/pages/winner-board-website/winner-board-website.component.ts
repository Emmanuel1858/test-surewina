import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserTicketService } from 'src/app/services/user-ticket.service';

@Component({
  selector: 'app-winner-board-website',
  templateUrl: './winner-board-website.component.html',
  styleUrls: ['./winner-board-website.component.scss']
})

export class WinnerBoardWebsiteComponent implements OnInit {

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
  showEmptyStateWinner: boolean = false


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
    // debugger
    try {
      // debugger
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.winnerBoardWebsite());
      this.showLoader = false;
      if (this.drawResults.length === 0) {
        this.showEmptyStateWinner = true;
        return;
      }
      this.drawResults = response.result;
      // this.reasonForError = response.responseMessage

      if(response.responseStatus === false ) {
        alert(response.responseMessage)
        return
      }

    

   

      // Capitalize each word in drawDescription
      this.drawResults = this.drawResults.map(draw => ({
        ...draw,
        drawDescription: this.capitalizeWords(draw.drawDescription)
      }));

      this.tabs = 'tab0';

    } catch (error) {
      
      this.showLoader = false;
      this.showEmptyStateWinner = true;
    }
  }

  // Capitalize each word in a string
  capitalizeWords(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
