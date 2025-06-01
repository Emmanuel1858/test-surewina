import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UserTicketService } from 'src/app/services/user-ticket.service';
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
  loading: boolean = true
  commissionEarned: string = '1,676,200';
  status: string = 'active';
  transactionStatus: string = 'Successful';
  allUsers: any = []
  allVendor: any = []
  ticketHistory: any = []
  userDetails: any = {}
  pageNumber: number = 1
  numberOfRecords: number = 5
  numberOfUsers: number = 0
  numberOfVendors: number = 0
  currentPage = 1;
  itemsPerPage = 5;
  showUserPagination: boolean = true
  showAgentPagination: boolean = false
  showAdminBtn: boolean = false



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

  constructor(private userService: UserService,
    private userTicket: UserTicketService,
    private router: Router, 
    private adminService: AdminService) { }

  switchTab(tab: string) {
    this.tabs = tab;
  }

  switchprimaryTabs(tab: string) {
    this.primaryTabs = tab;
    this.showAdminBtn = false
    if (this.primaryTabs == 'all-admin-container') {
      this.showAdminBtn = true
    }
    if (this.primaryTabs === 'all-users-container') {
      this.showUserPagination = true
      this.showAgentPagination = false
    } else {
      this.showUserPagination = false
      this.showAgentPagination = true
    }
  }

  addAdminBtn() {
    this.router.navigate(['/add-admin'])
  }

  async getAllUsers() {
    const getNumberOfUsers = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      // debugger
      this.loading = true
      const response = await lastValueFrom(this.userService.allGetUsers(getNumberOfUsers));
      console.log(response)
      this.loading = false
      this.numberOfUsers = response.result.items.length
      this.allUsers = response.result.items
    } catch (error) {
      console.log(error)
    }
  }

  async getUserById(id: number) {
    this.showBackBtn = true;
    try {
      this.getUserTicket(id)
      this.currentRoute = 'User Details'
      const response = await lastValueFrom(this.userService.getUserById(id))
      this.userDetails = response.result
      // console.log(response)
    } catch (error) {
      // console.log(error)
    }


  }

  async getAdminUrl() {
    try {
      const response = await lastValueFrom(this.adminService.getAdmin(1, 5))
      console.log(response)
      

    } catch (e) {
      console.log(e)
    }
  }

  async getUserTicket(userId: number) {
    // debugger
    const credentials = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      const response: any = await lastValueFrom(this.userTicket.getUserTicketHistory(userId, credentials))
      this.ticketHistory = response.result.items
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }

  async getAllVendor() {
    const getNumberOfUsers = {
      pageNumber: this.pageNumber,
      numberOfRecords: this.numberOfRecords
    }
    try {
      // this.loading = true
      const response = await lastValueFrom(this.userService.allGetVendor(getNumberOfUsers));
      // console.log(response)
      // this.loading = false
      this.numberOfVendors = response.result.items.length
      this.allVendor = response.result.items
    } catch (error) {
      // console.log(error)
    }
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.getAllVendor()
  }

  goBack() {
    if (this.primaryTabs == 'all-users-container') {
      this.primaryTabs = 'all-users-container'
      this.showUserPagination = true
      this.showAgentPagination = false
    } else {
      this.primaryTabs = 'all-agents-container'
      this.showUserPagination = false
      this.showAgentPagination = true

    }
    this.tabs = 'personal-information'
    this.showBackBtn = false;

  }

  detailsPage(role: string, roleData?: any) {
    this.showBackBtn = true;
    this.showUserPagination = false
    this.showAgentPagination = false

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

  changePage(page: number) {
    this.currentPage = page;
  }


  // total pages for prizes
  get totalPagesUser(): number[] {
    return Array.from({ length: Math.ceil(this.numberOfUsers / this.itemsPerPage) }, (_, i) => i + 1);
  }

  get paginatedUser() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allUsers.slice(start, start + this.itemsPerPage);
  }

  get totalPagesVendor(): number[] {
    return Array.from({ length: Math.ceil(this.numberOfVendors / this.itemsPerPage) }, (_, i) => i + 1);
  }

  get paginatedVendor() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allVendor.slice(start, start + this.itemsPerPage);
  }


}
