import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserTicketService {
  private baseUrl: string = environment.baseUrl
  private buyTicketWebUrl: string = environment.userTicket.buyTicketWeb
  private buyTicketUrl: string = environment.userTicket.buyTicket
  private onGoingTicketUrl: string = environment.userTicket.onGoingTicket
  private winnerBoardUrl: string = environment.userTicket.winnerBoard
  constructor(private http:HttpClient) { }

  buyTicketWeb(credentialsBuyTicket: {identifier: string, drawId: number, quantity: number, channel: number}) {
    const bearerToken = sessionStorage.getItem('token')
    if(!bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });

      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.buyTicketWebUrl}`, credentialsBuyTicket, httpOptions)
    }
    return new Observable<any>();
  }

  buyTicket(credentialsBuyTicket: {identifier: string, drawId: number, quantity: number, channel: number}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });

      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.buyTicketUrl}`, credentialsBuyTicket, httpOptions)
    }
    return new Observable<any>();
  }
  buyTicketVendor(credentialsBuyTicket: {identifier: string, drawId: number, quantity: number, channel: number}) {
    const bearerToken = sessionStorage.getItem('vendorToken')
    debugger
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });

      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.buyTicketUrl}`, credentialsBuyTicket, httpOptions)
    }
    return new Observable<any>();
  }


  onGoingTicket(credentialGoingTicket: {pageNumber: number, numberOfRecords: number}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.onGoingTicketUrl}`, credentialGoingTicket, httpOptions )
    }

    return new Observable<any>();
  }
  vendorHistoryTicket(credentialGoingTicket: {pageNumber: number, numberOfRecords: number}) {
    const bearerToken = sessionStorage.getItem('vendorToken')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.onGoingTicketUrl}`, credentialGoingTicket, httpOptions )
    }

    return new Observable<any>();
  }
  winnerBoard() {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.get(`${this.baseUrl}${this.winnerBoardUrl}`, httpOptions )
    }

    return new Observable<any>();
  }
}
