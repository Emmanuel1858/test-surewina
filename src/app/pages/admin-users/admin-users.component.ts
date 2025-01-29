import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {

  currentRoute: string = 'User Management';
  tabs: string = 'all-users-container';

  switchTab(tab: string) {
    this.tabs = tab;
  }
}
