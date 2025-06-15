import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseUrl
  private getAllUsers: string = environment.user.getAllUser
  private getOneUser: string = environment.user.getUserId
  private getAllVendors: string = environment.vendor.getAllVendor
  private getVendorSummary: string = environment.vendor.getVendorSummary

  constructor(private http: HttpClient, 
    private router: Router
  ) { }
  allGetUsers( getTheNumberOfUsers: { pageNumber: number; numberOfRecords: number; }) {
    const bearerToken = sessionStorage.getItem('token');
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
  
      const httpOptions = { headers };
      return this.http.post(`${this.baseUrl}${this.getAllUsers}`, getTheNumberOfUsers, httpOptions);
    } else {
      this.router.navigate(['/admin-login'])
    }
    return new Observable<any>();
  }

  getUserById(userId: number) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      return this.http.get(`${this.baseUrl}User/GetUser?userId=${userId}`, {headers})
    }

    return new Observable<any>()
  }

  allGetVendor( getTheNumberOfUsers: { pageNumber: number; numberOfRecords: number; }) {
    const bearerToken = sessionStorage.getItem('token');
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
  
      const httpOptions = { headers };
      return this.http.post(`${this.baseUrl}${this.getAllVendors}`, getTheNumberOfUsers, httpOptions);
    }
    return new Observable<any>();
  }

  getVendorDetails() {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.get(`${this.baseUrl}${this.getVendorSummary}`, httpOptions)

    } else {
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
    }
    return new Observable<any>()
  }
}
