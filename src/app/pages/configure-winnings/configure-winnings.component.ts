import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { DrawService } from 'src/app/services/draw.service';

@Component({
  selector: 'app-configure-winnings',
  templateUrl: './configure-winnings.component.html',
  styleUrls: ['./configure-winnings.component.scss']
})
export class ConfigureWinningsComponent {

  selectedFileName: string | null = null;
  image: Uint8Array | null = null;
  amount: number = 0;
  userAccountEnabled: boolean = false;
  ussdEnabled: boolean = false;
  vendorEnabled: boolean = false;
  websiteEnabled: boolean = false;
  showAddTicket: boolean = true
  showBuyWhere: boolean = false
  showModal: boolean = false
  showError: string = ''
  loading: boolean = false
  isDropdownOpen: boolean = false
  isDropdownOpenPrize: boolean = false
  isDropdownOpenLocation: boolean = false
  isDropdownOpenTierOne: boolean = false
  isDropdownOpenTierTwo: boolean = false
  isDropdownOpenTierThree: boolean = false
  days: string[] = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
  tierOnePercent: string[] =['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
  tierTwoPercent: string[] =['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
  tierThreePercent: string[] =['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
  prizeTierAllocation: string[] = ['10%', '20%', '30%', '40%']
  selectedDay: string = '';
  selectedTierOne: string = ''
  selectedTierTwo: string = ''
  selectedTierThree: string = ''
  selectedPrizeTier: string = ''
  selectedLocation: string = ''
  allSelectedLocation: string[] = []
  baseAmount: any = null
  allocationPercentage: number = 0
  tierOneValue: number = 0
  tierTwoValue: number = 0
  tierThreeValue: number = 0
  prizesToMegaAgent: string[] = ['Bokku Mart', 'Spar Supermarket', 'Shoprite jakande',]

  constructor(private router: Router,
    private drawService: DrawService
  ) { }

  goToLottery() {
    this.router.navigate(['/lottery'])
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name; // Store the filename
      console.log('File selected:', file.name);

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        this.image = new Uint8Array(arrayBuffer);
        console.log('Converted Image Bytes:', this.image);
      };
      reader.readAsArrayBuffer(file); // Convert image to raw bytes
    }
  }
 async createPrize() {
  debugger
    const credentials = {
      drawBaseAmount: this.baseAmount,
      salesAllocationInPercent: this.allocationPercentage, 
      tierOneAllocationInPercent: this.tierOneValue, 
      tierTwoAllocationInPercent: this.tierTwoValue, 
      tierThreeAllocationInPercent: this.tierThreeValue
    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.drawService.setConfigureWinnig(credentials))
      this.loading = false
      console.log(response)
      this.showModal = true
    } catch (e) {
      console.log(e)
    }
    if (!this.image) {

      this.showError = 'Kindly select an image'
      return;
    }


  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdownPrizeTier() {
    this.isDropdownOpenPrize = !this.isDropdownOpenPrize
  }

  toggleDropdownLocation() {
    this.isDropdownOpenLocation = !this.isDropdownOpenLocation
  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.allocationPercentage = parseInt(day)
    this.isDropdownOpen = false;
  }

  toggleDropdownTierOne() {
    this.isDropdownOpenTierOne = !this.isDropdownOpenTierOne
  }

  selectTierOne(tierOne: string) {
    this.selectedTierOne = tierOne
    this.tierOneValue = parseInt(tierOne);
    this.isDropdownOpenTierOne = false
  }

  toggleDropdownTierTwo() {
    this.isDropdownOpenTierTwo = !this.isDropdownOpenTierTwo
  }

  selectTierTwo(tierTwo: string) {
    this.selectedTierTwo = tierTwo
    this.tierTwoValue = parseInt(tierTwo)
    this.isDropdownOpenTierTwo = false
  }

  selectPrizeTier(prize: string) {
    this.selectedPrizeTier = prize;
    this.isDropdownOpenPrize = false;
  }

  toggleDropdownTierThree() {
    this.isDropdownOpenTierThree = !this.isDropdownOpenTierThree
  }

  selectTierThree(tierThree: string) {
    this.selectedTierThree = tierThree
    this.tierThreeValue = parseInt(tierThree)
    this.isDropdownOpenTierThree = false
  }

  selectLocation(location: string) {
    this.selectedLocation = location
    this.allSelectedLocation.push(this.selectedLocation)
    console.log(this.allSelectedLocation)
    this.isDropdownOpenLocation = false
  }

  isSelected(location: any): boolean {
  return this.allSelectedLocation.includes(location);
}

toggleSelection(location: any): void {
  if (this.isSelected(location)) {
    this.allSelectedLocation = this.allSelectedLocation.filter(item => item !== location);
  } else {
    this.allSelectedLocation.push(location);
  }
  
}
displaySelectedLocations(): string {
  return this.allSelectedLocation.length > 0 ? this.allSelectedLocation.join(', ') : '';
}

}
