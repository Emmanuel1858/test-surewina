import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {

  currentRoute: string = 'User Management';
  tabs: string = 'all-users-container';
  showBackBtn: boolean = false;
  commissionEarned: string = '1,676,200';
  status: string = 'active'

  switchTab(tab: string) {
    this.tabs = tab;
  }

  goBack() {
    // find a way to pass the tab the user was coming from 
    // user or agent tab 
    this.showBackBtn = false;
  }

  detailsPage(role: string, roleData?: any) {
    this.showBackBtn = true;

    if (role == 'user') {
      this.currentRoute = 'User Details';

    } else {
      this.currentRoute = 'Agent Details';
    }
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
    } else if (status.includes('approved') || status.includes('active')) {
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
      this.status = 'Inactive'; // You can choose a specific name here if needed
      return '#B51726';
    } else if (status.includes('approved') || status.includes('active')) {
      this.status = 'Active'; // You can choose a specific name here if needed
      return '#079455';
    } else {
      return 'transparent'; // Default color for unhandled statuses
    }
  }
}
