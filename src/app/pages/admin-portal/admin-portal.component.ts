import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent {

  constructor() {

  }

  currentRoute: string = 'Your Dashboard'
  userName: string = 'Dasola A';
  userEmail: string = 'dasola_dzn@gmail.com';
}
