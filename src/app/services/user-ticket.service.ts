import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  private vendorOnGoingTicketUrl: string = environment.userTicket.vendorTicketHistory
  private getTicketByIdUrl: string = environment.userTicket.ticketById
  private winnerBoardUrl: string = environment.userTicket.winnerBoard
  private winnerBoardAdminUrl: string = environment.userTicket.winnersBoardAdmin
  private winnerBoardMonthUrl: string = environment.userTicket.getWinnerByMonth
  private winnerByDrawId: string = environment.userTicket.getWinnerByDrawId
  private winnerBoardUserUrl: string= environment.userTicket.winnerBoardUser
  private winningTicketUrl: string = environment.userTicket.getClamWinningTicket
  constructor(private http:HttpClient, private router: Router) { }

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
    const bearerToken = sessionStorage.getItem('token')
    // debugger
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
    } else {
      // alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/login'])
      sessionStorage.clear()
    }

    return new Observable<any>();
  }
  vendorHistoryTicket(credentialGoingTicket: {pageNumber: number, numberOfRecords: number}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.vendorOnGoingTicketUrl}`, credentialGoingTicket, httpOptions )
    }

    return new Observable<any>();
  }

  getTicketById(ticketRef: string) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.get(`${this.baseUrl}UserTicket/GetTicketPrizesWon?ticketRefNumber=${ticketRef}`)
    }

    return new Observable<any> ()

  }
  getVendorTicketById(ticketRef: string) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.get(`${this.baseUrl}UserTicket/GetTicketPrizesWon?ticketRefNumber=${ticketRef}`, httpOptions)
    }

    return new Observable<any> ()

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
    } else {
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
    }

    return new Observable<any>();
  }

  winnerBoardUser() {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.get(`${this.baseUrl}${this.winnerBoardUserUrl}`, httpOptions )
    } else {
      this.router.navigate(['/login'])
      sessionStorage.clear()
    }

    return new Observable<any>();
  }
  winnerBoardAdmin() {
    const bearerToken = sessionStorage.getItem('token')
    if(!bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.get(`${this.baseUrl}${this.winnerBoardAdminUrl}`, httpOptions)
    }
    return new Observable<any>();
  }

  winnerBoardByMonth(credentialsMonth: string[]) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `${bearerToken}`,
        'Content-Type': 'application/json'
      });
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.winnerBoardMonthUrl}`, credentialsMonth, httpOptions)
    }
    return new Observable<any>()
  }

  getPrizeWonById(ticketRefNumber: string) {
    const bearerToken = sessionStorage.getItem('token')
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.get(`${this.baseUrl}UserTicket/GetUserDetails?ticketRefNumber=${ticketRefNumber}`, httpOptions)
    }
    return new Observable<any>()
  }

  getWinnerByDrawId(credentialsDrawId: {pageNumber: number, numberOfRecords: number, drawId: number}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.winnerByDrawId}`, credentialsDrawId, httpOptions )
    }
    return new Observable<any>()
  }

  getClamWinningTicket(credential: {ticketReference: string, convertedToMoney: boolean}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      })
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.winningTicketUrl}`, credential, httpOptions)
    }
    return new Observable<any>()
  }

}
