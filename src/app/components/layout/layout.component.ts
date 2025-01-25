import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  activeHeader: string = 'dashboard';
  showMenu: boolean = false;
  showPayTicket: boolean = false
  ticketCount: number = 0; 
  totalPrice: number = 0; 
  unitPrice: number = 1000; 


  constructor(private router: Router){}

  navigateToDashboard() {
    this.router.navigate(['/dashboard'])
    this.activeHeader = 'dashboard';
 
  }
  navigateToTicket() {
    this.router.navigate(['/ticket-history'])
    this.activeHeader = 'ticket';
  }
  navigateToWinner() {
    this.router.navigate(['/winner-board'])
    this.activeHeader = 'winner';
  }

  logout() {
    this.router.navigate(['/create-account-name'])
  }


  showBuyTicketModal() {
    this.showPayTicket = true
  }

  goBack() {
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

  openMenu(){
    this.showMenu = true
  }

  closeMenu() {
    this.showMenu = false
  }

  showDashboard() {
    this.showMenu = false
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

}
