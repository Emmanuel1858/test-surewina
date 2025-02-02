import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent {
  activeTabIndex = 0;
  escalationData = [
    { reason: 'Late Submission', dateCreated: '2024-01-29T10:30:00' }
  ];

  department = [
    { department: 'HR', recipientName: 'John Doe', recipientEmail: 'john@example.com' }
  ];

  branches = [
    { branch: 'Lagos HQ', recipientName: 'Jane Doe', recipientEmail: 'jane@example.com' }
  ];

  displayedColumns: string[] = ['reason', 'dateCreated', 'actions'];
  deptColumns: string[] = ['department', 'recipientName', 'recipientEmail', 'actions'];
  branchColumns: string[] = ['branch', 'recipientName', 'recipientEmail', 'actions'];


  add() {
    console.log('Add button clicked');
  }

  goToEditPath(item: any) {
    console.log('Edit Path:', item);
  }

  goToEditDept(item: any) {
    console.log('Edit Department:', item);
  }

  goToEditBranch(item: any) {
    console.log('Edit Branch:', item);
  }

  deleteEscalation(id: any) {
    console.log('Delete Escalation:', id);
  }

  deleteDepartmentBranch(id: any) {
    console.log('Delete Department/Branch:', id);
  }

}
