import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vendor-header',
  templateUrl: './vendor-header.component.html',
  styleUrls: ['./vendor-header.component.scss']
})
export class VendorHeaderComponent {
  constructor(private router: Router) {}
  goToDashboard() {
    this.router.navigate(['/vendor-dashboard'])
  }

}
