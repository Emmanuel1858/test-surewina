import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { DrawService } from 'src/app/services/draw.service';
import { PrizeDepotService } from 'src/app/services/prize-depot.service';
import { PrizeService } from 'src/app/services/prize.service';


@Component({
  selector: 'app-admin-lottery',
  templateUrl: './admin-lottery.component.html',
  styleUrls: ['./admin-lottery.component.scss']
})
export class AdminLotteryComponent implements OnInit {

  status: string = '';
  tabs: string = 'tickets'
  btnText: string = 'ADD TICKET'
  transactionStatus: string = 'Successful';
  drawHistoryStatus: string = 'Active'
  winningConfigPage: boolean = false
  viewMore: boolean = false
  allTicket: any = []
  numberOfTicket: number = 0
  getAllDrawHistory: any = []
  numberOfDrawHistory: number = 0
  getAllPrizeArray: any = []
  numberOfPrize: number = 0
  getAllPrizeDepot: any = []
  numberOfPrizeDepot: number = 0
  businessBaseAmount: number = 0
  salesAllocation: number = 0
  tierOneAllocationInPercent: number = 0
  tierTwoAllocationInPercent: number = 0
  tierThreeAllocationInPercent: number = 0
  loading: boolean = false

  constructor(private router: Router, 
    private prize: PrizeService, 
    private adminService: AdminService, 
    private drawService: DrawService, 
    private prizeService: PrizeService, 
    private prizeDepotService: PrizeDepotService
  ) { }

  ngOnInit(): void {
    this.getAllTicket()
    this.getDrawHistory()
    this.getAllPrize()
    this.getAllDepot()
    this.getWinnigConfig()
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
    // debugger
    this.tabs = tab;
    if (this.tabs === 'tickets') {
      this.winningConfigPage = false
      this.btnText = 'ADD TICKET'
    }
    if (this.tabs === 'drawHistory') {
      this.winningConfigPage = false
      this.btnText = 'SCHEDULE DRAW'
    
    }
    if (this.tabs === 'prizes') {
      this.winningConfigPage = false
      this.btnText = 'ADD PRIZE'
   
    }
    if (this.tabs === 'prizeDepot') {
      this.winningConfigPage = false
      this.btnText = 'ADD PRIZE DEPOT'
     
    }
    if (this.tabs === 'winningConfig') {
      this.winningConfigPage = true
      this.btnText = 'CONFIGURE WINNINGS'
      
    }
    console.log(tab)
  }

  goToNext() {
    if (this.btnText === 'ADD TICKET') {
      this.router.navigate(['/lottery-add-ticket'])
      return
    }
    if (this.btnText === 'SCHEDULE DRAW') {
      this.router.navigate((['/schedule-draw']))
     
    }
    if (this.btnText === 'ADD PRIZE') {
      this.router.navigate(['/add-prize'])
    }
    if (this.btnText === 'ADD PRIZE DEPOT') {
        this.router.navigate(['/add-prize-depot'])
    }
    if (this.btnText === 'CONFIGURE WINNINGS') {
      this.router.navigate(['/configure-winning'])
    }
  }

  configureTier() {
    this.router.navigate(['/configure-tier'])
  }

  openMoreConfig() {
    this.viewMore = true
  }

  closeMoreConfig() {
    this.viewMore = false
  }

 async getAllTicket() {
  // debugger
    const pagination = {
      pageNumber: 1,
      numberOfRecords: 10
    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.adminService.getAllTicket(pagination))
      this.loading = false
      console.log(response)
      const result = response.result.items
      const processed = result.map((ticket: any) => {
        if (typeof ticket.image === 'string' && ticket.image.startsWith('data:image')) {
          return ticket
        }
        if(typeof ticket.image === 'string') {
          return {
            ...ticket, 
            image:`data:image/png;base64,${ticket.image}`
          }
        }
        return ticket
      })
      this.allTicket = processed
      this.numberOfTicket = response.result.totalCount

    } catch (e) {
      console.log(e)
    }
  }

 async getDrawHistory() {
    const pagination = {
      pageNumber : 1, 
      numberOfRecords: 60
    }
    try {
      this.loading = true

      const response = await lastValueFrom(this.drawService.getDrawHistory(pagination))
      console.log(response)
      this.loading = false
      const result = response.result.items
      const processed = result.map((draw: any ) => {
        if(typeof draw.ticketImage === 'string' && draw.ticketImage.startsWith('data:image')) {
          return draw
        }
        if (typeof draw.ticketImage === 'string') {
          return {
            ...draw,
            ticketImage: `data:image/png;base64,${draw.ticketImage}`
          }
        }
        return draw
      })
      this.getAllDrawHistory = processed
      this.numberOfDrawHistory = response.result.totalCount
    } catch (e) {
      console.log(e)
    }
  }

  // async getAllPrize() {
  //   try {
  //     // debugger
  //     const response = await lastValueFrom(this.prizeService.getAllPrize())
  //     console.log(response)
  //     this.getAllPrizeArray = response.result
  //     this.numberOfPrize = response.result.length

  //   } catch(e) {
  //     console.log(e)
  //   }
  // }
  async getAllPrize() {
    try {
      this.loading = true
      const response = await lastValueFrom(this.prizeService.getAllPrize());
      this.loading = false
      const result = response.result;
  
      const processed = result.map((prize: any) => {
        if (typeof prize.image === 'string' && prize.image.startsWith('data:image')) {
          return prize;
        }
  
        // If it's a base64 string without the header, add the prefix
        if (typeof prize.image === 'string') {
          return {
            ...prize,
            image: `data:image/png;base64,${prize.image}`, // change to jpeg if needed
          };
        }
  
        return prize;
      });
  
      this.getAllPrizeArray = processed;
      this.numberOfPrize = processed.length;
  
    } catch (e) {
      console.log(e);
    }
  }
  
  // byteArrayToBase64(byteArray: number[]): string {
  //   const binary = byteArray.map(byte => String.fromCharCode(byte)).join('');
  //   return window.btoa(binary);
  // }
  

  async getAllDepot() {
    // debugger
    const pagination = {
      pageNumber: 1,
      numberOfRecords: 10
    }
    try {
      const response = await lastValueFrom(this.prizeDepotService.getPrizeDepot(pagination))
      console.log(response)
      const result = response.result.items 
      const processed = result.map((prize: any) => {
        if(typeof prize.depotImage === 'string' && prize.depotImage.startsWith('data:image')) {
          return prize
        }

        if(typeof prize.depotImage === 'string') {
          return {
            ...prize, 
            depotImage: `data:image/png;base64,${prize.depotImage}`,
          };
        }

        return prize
      })
      this.getAllPrizeDepot = processed
      this.numberOfPrizeDepot = response.result.totalCount
    } catch(err) {
      console.log(err)
    }
  }

  async getWinnigConfig() {
    try {
      const response = await lastValueFrom(this.drawService.getConfigureWin())
      console.log(response)
      this.businessBaseAmount = response.result.drawBaseAmount
      this.salesAllocation = response.result.salesAllocationInPercent
      this.tierOneAllocationInPercent = response.result.tierOneAllocationInPercent
      this.tierTwoAllocationInPercent = response.result.tierTwoAllocationInPercent
      this.tierThreeAllocationInPercent = response.result.tierThreeAllocationInPercent
      
    } catch(e) {
      console.log(e)
    }
  }
  // async getAllTickets() {
  //   try {
  //     const response = await lastValueFrom(this.prize.getAllPrize())
  //     console.log(response)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


}
