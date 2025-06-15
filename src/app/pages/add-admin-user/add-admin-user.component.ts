import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-add-admin-user',
  templateUrl: './add-admin-user.component.html',
  styleUrls: ['./add-admin-user.component.scss']
})
export class AddAdminUserComponent {
  selectedFileName: string | null = null;
  image: any | null = null;
  fullName: string = '';
  number: string = ''
  email: string = ''
  userAccountEnabled: boolean = false;
  ussdEnabled: boolean = false;
  vendorEnabled: boolean = false;
  websiteEnabled: boolean = false;
  showAddTicket: boolean = true
  showBuyWhere: boolean = false
  showModal: boolean = false
  showError: string = ''
  loading: boolean = false
  constructor(private router: Router, private adminService: AdminService, private authService: AuthServiceService) { }

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
  
  
  
  goToSummary() {
  if(this.fullName === '' || this.number === '' || this.email === '') {
    return
  } else {
    this.showBuyWhere = true
    this.showAddTicket = false
  }

  }

  async saveData() {
    const credentials = {
      fullName: this.fullName, 
      email: this.email, 
      phoneNumber: this.number
    }
    try {
      this.loading = true
      const response = await lastValueFrom(this.authService.registerAdmin(credentials))
      this.loading = false
      if(response.responseStatus === false) {
        alert(response.responseMessage)
        return
      }

      if(response.responseStatus === true) {
        this.showModal = true
        
      }

    } catch {

    }
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
    this.router.navigate(['/users'])
  }

  // async getAddTicket() {

  //   const credentials = {
  //     image: this.image,
  //     amount: this.amount,
  //     userAccountEnabled: this.userAccountEnabled,
  //     ussdEnabled: this.ussdEnabled,
  //     vendorEnabled: this.vendorEnabled,
  //     websiteEnabled: this.websiteEnabled
  //   }
  //   try {
  //     this.loading = true
  //     const response = await lastValueFrom(this.adminService.addTicket(credentials))
  //     // console.log(response)
  //     this.loading = false
  //     if(response.responseStatus === false) {
  //       console.log('error')
  //     } else {
  //       this.showModal = true
  //     }
  //   } catch (error) {
  //     // console.log(error)
  //   }

  // }
}
