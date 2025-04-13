import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private baseUrl: string = environment.baseUrl
  private userDetailsUrl: string = environment.userAccount.userDetails
  private userAddressUrl: string = environment.userAccount.updateAddress
  private userPasswordUrl: string =  environment.userAccount.updatePassword

  constructor(private http: HttpClient) { }

  userDetails() {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders().set('Authorization', ` bearer ${bearerToken}`)
      return this.http.get(`${this.baseUrl}${this.userDetailsUrl}`, {headers})
    }
    return new Observable<any>();
  }
  
  vendorDetails() {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders().set('Authorization', ` bearer ${bearerToken}`)
      return this.http.get(`${this.baseUrl}${this.userDetailsUrl}`, {headers})
    }
    return new Observable<any>();
  }
  userAddressUpdate(credentialsAddressUpdate: { password: string; address: string }) {
    const bearerToken = sessionStorage.getItem('token');
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
  
      const httpOptions = { headers };
  
      return this.http.post(`${this.baseUrl}${this.userAddressUrl}`, credentialsAddressUpdate, httpOptions);
    }
    return new Observable<any>();
  }
  vendorAddressUpdate(credentialsAddressUpdate: { password: string; address: string }) {
    const bearerToken = sessionStorage.getItem('token');
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
  
      const httpOptions = { headers };
  
      return this.http.post(`${this.baseUrl}${this.userAddressUrl}`, credentialsAddressUpdate, httpOptions);
    }
    return new Observable<any>();
  }

  userPasswordUpdate(credentialsPasswordUpdate: { oldPassword: string; newPassword: string }) {
    const bearerToken = sessionStorage.getItem('token');
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
  
      const httpOptions = { headers };
      return this.http.post(`${this.baseUrl}${this.userPasswordUrl}`, credentialsPasswordUpdate, httpOptions);
    }
    return new Observable<any>();
  }
  vendorPasswordUpdate(credentialsPasswordUpdate: { oldPassword: string; newPassword: string }) {
    const bearerToken = sessionStorage.getItem('token');
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
  
      const httpOptions = { headers };
      return this.http.post(`${this.baseUrl}${this.userPasswordUrl}`, credentialsPasswordUpdate, httpOptions);
    }
    return new Observable<any>();
  }
  
}
