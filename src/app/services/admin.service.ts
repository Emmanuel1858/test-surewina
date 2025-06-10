import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string = environment.baseUrl
  private addTicketUrl: string = environment.ticketDescription.addTicket
  private getAllTicketUrl: string = environment.ticketDescription.getAll
  private getAllAdminUser: string = environment.admin.getAllAdmin

  constructor(private http: HttpClient) { }

  addTicket(credentialsAddTicket: {
    image: any,
    amount: number,
    userAccountEnabled: boolean,
    ussdEnabled: boolean,
    vendorEnabled: boolean,
    websiteEnabled: boolean
  }
  ) {
    const bearerToken = sessionStorage.getItem('token')
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      });
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.addTicketUrl}`, credentialsAddTicket, httpOptions)
    }
    return new Observable<any>()
  }

  getAllTicket(credentials: { pageNumber: number, numberOfRecords: number }) {
    const bearerToken = sessionStorage.getItem('token')
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      })
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.getAllTicketUrl}`, credentials, httpOptions)
    }
    return new Observable<any>()
  }

  getAdmin(pageNumber: number, numberOfRecords: number )  {
    const bearerToken = sessionStorage.getItem('token')
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      })
      const httpOptions = { headers }
      return this.http.get(`${this.baseUrl}${this.getAllAdminUser}?PageNumber=${pageNumber}&NumberOfRecords=${numberOfRecords}`, httpOptions)
    }
    return new Observable<any>()
  }


}
