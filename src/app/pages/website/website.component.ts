import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent {
  showTicketPayment: boolean = false
  showMakePayment: boolean = false
  showLoader: boolean = false 

  constructor(private router: Router){}

  navigateToCreatAccount() {
    this.router.navigate(['/create-account-name'])
  }

  navigateToPaymentTicket() {
    this.showTicketPayment = true
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

}


