import { Component, OnInit } from '@angular/core';
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
  

  constructor(private userTicket: UserTicketService){}

  ngOnInit(): void {
      this.getWinnerBoard()
  }

  async getWinnerBoard() {
    try {
      this.showLoader = true
      const response = await lastValueFrom(this.userTicket.winnerBoard())
      // console.log(response)
      this.showLoader = false
      this.ticketName = response.result
     
    } catch (error) {
     console.log(error)
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
