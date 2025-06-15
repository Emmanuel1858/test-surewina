import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-initiate',
  templateUrl: './admin-initiate.component.html',
  styleUrls: ['./admin-initiate.component.scss']
})
export class AdminInitiateComponent  {
  constructor(private router: Router){}
  navigateToAddTicket() {
    this.router.navigate(['/lottery-add-ticket'])
  }
  navigateToAddPrize() {
    this.router.navigate(['/add-prize'])
  }
  navigateToSchduleDraw() {
    this.router.navigate(['/schedule-draw'])
  }


}
