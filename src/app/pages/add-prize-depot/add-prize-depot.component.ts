import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PrizeDepotService } from 'src/app/services/prize-depot.service';

@Component({
  selector: 'app-add-prize-depot',
  templateUrl: './add-prize-depot.component.html',
  styleUrls: ['./add-prize-depot.component.scss']
})
export class AddPrizeDepotComponent {

  showAddTicket: boolean = true
  isDropdownOpen: boolean = false
  selectedFileName: string | null = null;
  image: any | null = null;
  selectedDay: string = '';
  days: string[] = ['Tier 1 - 10% allocated', 'Tier 2 - 8% allocated', 'Tier 3 - 20% allocated'];
  showModal: boolean = false
  depotName: string = ''
  depotAddress: string = ''
  loading: boolean = false

  constructor(private router: Router,
    private prizeDepot: PrizeDepotService
  ) { }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }


  goToLottery() {
    this.router.navigate(['/lottery'])
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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
    // debugger
    const credentials = {
      name: this.depotName,
      address: this.depotAddress,
      image: this.image
    }
    // if (!this.image) {

    //   this.showError = 'Kindly select an image'
    //   return;
    // }

    try {
      this.loading = true
      const response = await lastValueFrom(this.prizeDepot.addPrizeDepot(credentials))
      this.loading = false
      // console.log(response)
      this.showModal = true
    } catch (e) {
      // console.log(e)
    }
  

  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.isDropdownOpen = false;
  }
}
