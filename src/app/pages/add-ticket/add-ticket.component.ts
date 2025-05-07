import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
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

  constructor(private router: Router, private adminService: AdminService) { }


  
  ngOnInit(): void {

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
  
  
  
  goToBuyWhere() {
    if (!this.image) {
      
      this.showError = 'Kindly select an image'
      return;
    }
    if(this.amount < 200) {
      this.showError = 'Kindly enter a valid amount!'
      return
    }
    this.showBuyWhere = true
    this.showAddTicket = false

  }

  goToModal() {
    // console.log('ussd:',this.ussdEnabled)
    // console.log('agent:', this.vendorEnabled)
    // console.log('web app', this.userAccountEnabled)
    // console.log('website', this.websiteEnabled)
    
    // this.showModal = true

  }

  goToAddTicket() {
    this.showBuyWhere = false
    this.showAddTicket = true
  }

  goToLottery() {
    this.router.navigate(['/lottery'])
  }

  async getAddTicket() {

    const credentials = {
      image: this.image,
      amount: this.amount,
      userAccountEnabled: this.userAccountEnabled,
      ussdEnabled: this.ussdEnabled,
      vendorEnabled: this.vendorEnabled,
      websiteEnabled: this.websiteEnabled
    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.adminService.addTicket(credentials))
      // console.log(response)
      this.loading = false
      if(response.responseStatus === false) {
        console.log('error')
      } else {
        this.showModal = true
      }
    } catch (error) {
      // console.log(error)
    }

  }
}
