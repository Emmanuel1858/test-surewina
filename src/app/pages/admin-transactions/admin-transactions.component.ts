import { Component, OnInit } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';
import { AnalyticsService } from 'src/app/services/analytics.service';


@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.component.html',
  styleUrls: ['./admin-transactions.component.scss']
})
export class AdminTransactionsComponent implements OnInit {

  status: string = '';
  totalEarning: number = 0;
  userAccount: number = 0
  website: number = 0
  vendor: number = 0
  transactionStatus: string = 'Successful'
  allTransactions: any = []

  constructor(private analyticsService: AnalyticsService) {

  }

  ngOnInit(): void {
    this.transactionSaleSummary()
    this.analysisSummary()
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

 async transactionSaleSummary () {
  const pagination = {
    pageNumber: 1,
    numberOfRecords: 10
  }
    try {
      const response = await lastValueFrom(this.analyticsService.analyticsSaleSummary(pagination))
      this.allTransactions = response.result.items
      console.log(response)

    } catch (e) {
      console.log(e)
    }
  }

  async analysisSummary() {
    try {
      const response = await lastValueFrom(this.analyticsService.analyticsAdmin())
      console.log(response)
      this.totalEarning = response.result.overallSummary.totalAmount
      this.website = response.result.summaryByChannel[0].count
      this.vendor = response.result.summaryByChannel[1].count
      this.userAccount = response.result.summaryByChannel[2].count


    } catch (e) {
      console.log(e)
    }
  }

}
