import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-lottery',
  templateUrl: './admin-lottery.component.html',
  styleUrls: ['./admin-lottery.component.scss']
})
export class AdminLotteryComponent {

  status: string = '';
  transactionStatus: string = 'Successful';
  tab: string = 'tickets'

  constructor () {
    
  }

  getBtnColor(value: any) {
    if (!value) {
      return 'null' 
    } 

    const status = value.toLowerCase();
    
    if (status.includes('inactive') || status.includes('pending')) {
      return 'inactive';
    } else if (status.includes('rejected')) {
      return 'rejected';
    } else if (status.includes('approved') || status.includes('success')) {
      return 'active';
    } else {
      return 'transparent'; // Default color for unhandled statuses
    }
  }

  getFillColor(value: any): string {
    if (!value) {
      this.status = 'Not Available';
      return 'transparent'; // Or 'black' if you prefer
    }
  
    const status = value.toLowerCase();
  
    if (status.includes('pending')) {
      this.status = 'Pending';
      return '#DC6803';
    } else if (status.includes('rejected') || status.includes('inactive')) {
      this.status = 'Rejected/Inactive'; // You can choose a specific name here if needed
      return '#B51726';
    } else if (status.includes('approved') || status.includes('success')) {
      this.status = 'Approved/Active'; // You can choose a specific name here if needed
      return '#079455';
    } else {
      return 'transparent'; // Default color for unhandled statuses
    }
  }

  switchTab(tab: string) {

  }
}
