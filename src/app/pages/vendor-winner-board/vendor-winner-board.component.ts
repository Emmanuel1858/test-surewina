import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserTicketService } from 'src/app/services/user-ticket.service';

@Component({
  selector: 'app-vendor-winner-board',
  templateUrl: './vendor-winner-board.component.html',
  styleUrls: ['./vendor-winner-board.component.scss']
})
export class VendorWinnerBoardComponent implements OnInit{
  ticketName: any = []
  selectedTicketIndex: number | null = null
  mobileVisibility: boolean = true
  showLoader: boolean = false
  showMenu: boolean = false;
  

  constructor(private userTicket: UserTicketService, private router:Router){}

  ngOnInit(): void {
      this.getWinnerBoard()
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


  async getWinnerBoard() {
    try {
      this.showLoader = false
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
    this.mobileVisibility = false// Update selected ticket index
  }

  closeWinner() {
    this.mobileVisibility = false
  }
}
