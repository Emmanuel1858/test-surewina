import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy   {
  bars: boolean[]= [true, false, false, false, false];
  currentIndex: number = 0;
  intervalId: any;
  backgroundImages: string[] = [
    '../../../assets/samsung-tv.svg',
    '../../../assets/yellow-paper.svg',
    '../../../assets/white-jeep.svg',
    '../../../assets/samsung-tv.svg',
    '../../../assets/yellow-paper.svg'

  ];
  currentBackgroundImage: string = this.backgroundImages[0];
  transitioning: boolean = false;
  showTicketPayment: boolean = false
  showMakePayment: boolean = false
  showLoader: boolean = false 
  showBalance: boolean = false 
  ticketCount: number = 0; 
  totalPrice: number = 0; 
  unitPrice: number = 1000; 

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


  ngOnInit(): void {
    this.startAutoAdvance();
  }

  ngOnDestroy(): void {
    this.clearAutoAdvance();
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

  showMyBalance() {
    this.showBalance = !this.showBalance
  }

 
  goNext(): void {
    if (this.currentIndex < this.bars.length - 1) {
      this.currentIndex++;
      this.bars[this.currentIndex] = true; 
      this.updateBackgroundImage();
    }
    this.resetAutoAdvance();
  }


  goPrev(): void {
    if (this.currentIndex > 0) {
      this.bars[this.currentIndex] = false;
      this.currentIndex--;
      this.updateBackgroundImage();
    }
    this.resetAutoAdvance();
  }


  startAutoAdvance(): void {
    this.intervalId = setInterval(() => {
      this.goNext();
    }, 13000);
  }


  clearAutoAdvance(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  resetAutoAdvance(): void {
    this.clearAutoAdvance();
    this.startAutoAdvance();
  }

  updateBackgroundImage(): void {
    this.currentBackgroundImage = this.backgroundImages[this.currentIndex];
  }


  startTransition(callback: () => void): void {
    this.transitioning = true;
    setTimeout(() => {
      callback();
      this.transitioning = false;
    }, 800); // Match the CSS transition duration
  }
}
