import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private router: Router){}

  navigateToDashboard() {
    this.router.navigate(['/dashboard'])
  }
  navigateToTicket() {
    this.router.navigate(['/ticket-history'])
  }
  navigateToWinner() {
    this.router.navigate(['/winner-board'])
  }

}
