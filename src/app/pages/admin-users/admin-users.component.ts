import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {


 

  currentRoute: string = 'User Management';
  primaryTabs: string = 'all-users-container';
  tabs: string = 'personal-information';
  showBackBtn: boolean = false;
  commissionEarned: string = '1,676,200';
  status: string = 'active';
  transactionStatus: string = 'Successful';
  allUsers: any = []
  pageNumber: number = 1
  numberOfRecords: number = 3
  numberOfUsers: number = 0

  // firstName: string = ''
  // lastName: string = ''
  // email: string = ''
  // phoneNumber: string = ''
  // jollyPoints: number = 0
  // totalWinningTickets: number = 0
  // totalPrizeValueAmount: number = 0
  // totalTicketsBought: number = 0
  // totalTicketsBoughtAmount:number = 0
  // registeredOn: string = ""

  constructor(private userService: UserService) {}

  switchTab(tab: string) {
    this.tabs = tab;
  }

  switchprimaryTabs(tab: string) {
    this.primaryTabs = tab;
  }

  async getAllUsers() {
    const getNumberOfUsers = {
      pageNumber : this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      const response = await lastValueFrom(this.userService.allGetUsers(getNumberOfUsers));
      console.log(response)
      this.numberOfUsers = response.result.items.length
      this.allUsers = response.result.items
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit(): void {
      this.getAllUsers()
  }

  goBack() {
    if (this.primaryTabs == 'all-users-container' ) {
      this.primaryTabs = 'all-users-container'
    } else {
      this.primaryTabs = 'all-agents-container'
    }
    this.tabs = 'personal-information'
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
      return 'transparent'; 
    }
  }

  getFillColor(value: any): string {
    if (!value) {
      this.status = 'Not Available';
      return 'transparent'; 
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
