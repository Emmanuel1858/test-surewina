import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { DrawService } from 'src/app/services/draw.service';
import { PrizeService } from 'src/app/services/prize.service';

@Component({
  selector: 'app-schedule-draw',
  templateUrl: './schedule-draw.component.html',
  styleUrls: ['./schedule-draw.component.scss']
})
export class ScheduleDrawComponent implements OnInit {
  showScheduleDraw: boolean = true
  showTierPrize: boolean = false
  selectedDay: string = '';
  isDropdownOpen: boolean = false;
  showModal: boolean = false
  numberOfTicket: number = 0
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
  getAllPrizeArray: any = []
  numberOfPrize: number = 0
  allTicket: any = []
  selectedTicketId: any = 0;
  drawName: string = ''
  ticketId: number =  0
  isRecurring: boolean = true
  date: any = null
  recurringDay: number = 0
  tierPrizeOneId: number = 0
  tierPrizeTwoId: number = 0
  tierPrizeThreeId: number = 0
  megaPrizeId: any = null
  hasMegaPrize: boolean = false
  loading: boolean = false
  showLoadingTicket: boolean = false
  // numberOfTicket: number = 0

  constructor(private router: Router,
    private prizeService: PrizeService, 
    private adminService: AdminService,
    private drawService: DrawService
  ){}

  ngOnInit(): void {
    this.getAllPrize()
    this.getAllTicket()
  }

   goToLottery() {
    this.router.navigate(['/lottery'])
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  increment() {
    if(this.numberOfTicket >= 0 ) {
      this.numberOfTicket++
      return
    }
  }

  decrement() {
    if(this.numberOfTicket !== 0) {
      this.numberOfTicket--
    }
  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.isDropdownOpen = false;
  
    switch (day.toLowerCase()) {
      case 'monday':
        this.recurringDay = 1;
        break;
      case 'tuesday':
        this.recurringDay = 2;
        break;
      case 'wednesday':
        this.recurringDay = 3;
        break;
      case 'thursday':
        this.recurringDay = 4;
        break;
      case 'friday':
        this.recurringDay = 5;
        break;
      case 'saturday':
        this.recurringDay = 6;
        break;
      case 'sunday':
        this.recurringDay = 7;
        break; // optional fallback
    }
  }
  

  goToScheduleDraw() {
    // debugger

    this.showScheduleDraw = true
    this.showTierPrize = false
  }

  onTicketSelect(ticketId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
  
    // Toggle logic: if it's the same ticket, unselect it
    if (isChecked) {
      this.selectedTicketId = ticketId;
      // console.log(this.selectedTicketId)
      sessionStorage.setItem('selectedTicketId', ticketId.toString());
    } else {
      this.selectedTicketId = null;
      sessionStorage.removeItem('selectedTicketId');
    }
  
    console.log('Selected Ticket ID:', this.selectedTicketId);
  }

  goToPrizeTier() {
    // sessionStorage.setItem('drawName', this.drawName)
    // switch (this.selectDay) {
    //   case 'Monday':
    //     sessionStorage.setItem('')
    //     break;
    
    //   default:
    //     break;
    // }

    this.showTierPrize = true
    this.showScheduleDraw = false
  }

  isPrizeChecked(prizeId: number): boolean {
    return [this.tierPrizeOneId, this.tierPrizeTwoId, this.tierPrizeThreeId].includes(prizeId);
  }

  onPrizeCheckboxChange(event: Event, prizeId: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      if (this.tierPrizeOneId === 0) {
        this.tierPrizeOneId = prizeId;
      } else if (this.tierPrizeTwoId === 0) {
        this.tierPrizeTwoId = prizeId;
      } else if (this.tierPrizeThreeId === 0) {
        this.tierPrizeThreeId = prizeId;
      } else {
        // Already picked 3
        (event.target as HTMLInputElement).checked = false;
        alert('You can only select up to 3 prizes.');
      }
    } else {
      // Unchecking: clear the prize from wherever it was stored
      if (this.tierPrizeOneId === prizeId) {
        this.tierPrizeOneId = 0;
      } else if (this.tierPrizeTwoId === prizeId) {
        this.tierPrizeTwoId = 0;
      } else if (this.tierPrizeThreeId === prizeId) {
        this.tierPrizeThreeId = 0;
      }
    }
  
  }

  async scheduleDraw() {
    // debugger
    const credentials = {
      ticketId: this.selectedTicketId,
      name: this.drawName, 
      isRecurring: this.isRecurring, 
      drawDate: this.date,
      recurringDay: this.recurringDay,
      tierOnePrizeId: this.tierPrizeOneId, 
      tierTwoPrizeId: this.tierPrizeTwoId,
      tierThreePrizeId: this.tierPrizeThreeId,
      megaPrizeId: this.megaPrizeId,
      hasMegaPrize: this.hasMegaPrize,
      minimumTickets: this.numberOfTicket
    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.drawService.addDraw(credentials)) 
      this.loading = false
      if(response.responseStatus === true) {
        // console.log(response)
        this.showModal = true
      } else {
        return
      }

    } catch(e) {
      
      // console.log(e)
    }
    
  }

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
      // console.log(e);
    }
  }
  
  
  async getAllTicket() {
    // debugger
      const pagination = {
        pageNumber: 1,
        numberOfRecords: 10
      }
      try {
        this.showLoadingTicket = true
        const response = await lastValueFrom(this.adminService.getAllTicket(pagination))
        this.showLoadingTicket = false
        // console.log(response)
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
        // this.numberOfTicket = response.result.totalCount
  
      } catch (e) {
        // console.log(e)
      }
    }

}
