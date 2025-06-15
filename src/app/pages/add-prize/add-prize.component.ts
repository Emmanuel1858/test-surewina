import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PrizeService } from 'src/app/services/prize.service';

@Component({
  selector: 'app-add-prize',
  templateUrl: './add-prize.component.html',
  styleUrls: ['./add-prize.component.scss']
})
export class AddPrizeComponent {
  selectedFileName: string | null = null;
  image: any | null = null;
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
  days: string[] = ['Tier 1', 'Tier 2', 'Tier 3',];
  prizeTierAllocation: string[] = ['10%', '20%', '30%', '40%']
  selectedDay: string = '';
  selectedPrizeTier: string = ''
  selectedLocation: string = ''
  allSelectedLocation: string[] = []
  prizeName: string = ''
  prizeTier: any = null
  estimatedPrice: any = null
  
  prizesToMegaAgent: string[] = ['Bokku Mart', 'Spar Supermarket', 'Shoprite jakande',]

  constructor(private router: Router, 
    private addPrize: PrizeService
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
      this.selectedFileName = file.name;
  
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = (e.target?.result as string).split(',')[1]; // Remove data URL header
        // console.log('Base64 Image:', base64String);
  
        // Now send base64String to your backend
        this.image = base64String
      };
      reader.readAsDataURL(file); // This gives you base64
    }
  }
 async createPrize() {
    // if (!this.image) {

    //   this.showError = 'Kindly select an image'
    //   return;
    // }
    // debugger
    if(this.selectedDay === 'Tier 1') {
      this.prizeTier = 1
    } else if (this.selectedDay === 'Tier 2') {
      this.prizeTier = 2
    } else if (this.selectedDay === 'Tier 3') {
      this.prizeTier = 3
    }
    const credentials = {
      name: this.prizeName,
      prizeTier: this.prizeTier,
      estimatedPrice: this.estimatedPrice,
      image: this.image
    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.addPrize.addPrize(credentials))
      this.loading = false
      return response
      // console.log(response)
    } catch (e) {
      // console.log(e)
    }
    
    this.showModal = true

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
    this.isDropdownOpen = false;
  }

  selectPrizeTier(prize: string) {
    this.selectedPrizeTier = prize;
    this.isDropdownOpenPrize = false;
  }

  selectLocation(location: string) {
    this.selectedLocation = location
    this.allSelectedLocation.push(this.selectedLocation)
    // console.log(this.allSelectedLocation)
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
