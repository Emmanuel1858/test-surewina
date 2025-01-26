import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  tabs: string = 'prizes'; 
  ctaPosition: number = 1;
  h2ctaText: string = 'Setup a draw';
  pctaText: string = 'Schedule monthly or weekly draws';
  imgSrc: string = '../.././../assets/configuration-02.svg';

  ngOnInit() {  }


  switchTab(tab: string) {
    this.tabs = tab;
  }

  // this cannot work cause designer did not export the necessary files
  // need to export items in a particular way

  ctaFlip() {
    switch(this.ctaPosition) {
      case 2:
        this.imgSrc = '../.././../assets/configuration-02.svg'
        this.h2ctaText = 'Create a ticket';
        this.pctaText = 'Configure ticket details and prices';
        break;
      case 3: 
        this.h2ctaText = 'Add new prize';
        this.pctaText = 'Add a new prize into the system';
        break;
      default: 
        this.h2ctaText = 'Setup a draw';
        this.pctaText = 'Schedule monthly or weekly draws';
    }
  }


}


