import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure-tier',
  templateUrl: './configure-tier.component.html',
  styleUrls: ['./configure-tier.component.scss']
})
export class ConfigureTierComponent {
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
  days: string[] = ['Tier 1', 'Tier 2', 'Tier 3',];
  prizeTierAllocation: string[] = ['10%', '20%', '30%', '40%']
  selectedDay: string = '';
  selectedPrizeTier: string = ''
  selectedLocation: string = ''
  allSelectedLocation: string[] = []
  prizesToMegaAgent: string[] = ['Bokku Mart', 'Spar Supermarket', 'Shoprite jakande',]

  constructor(private router: Router) { }

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
  createPrize() {
    // if (!this.image) {

    //   this.showError = 'Kindly select an image'
    //   return;
    // }
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
