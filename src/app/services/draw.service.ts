import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private baseUrl = environment.baseUrl
  private getTodayDrawUrl = environment.draw.getTodayDraw
  private getDrawHistoryUrl = environment.draw.getDrawHistory
  private addDrawUrl = environment.draw.addDraw
  private setconfigureWinningUrl: string = environment.draw.setConfigWin
  private getConfigureWinnigUrl: string = environment.draw.getConfigWin

  
  constructor(private http: HttpClient, private router: Router) { }
  getTodayDraw(credentialsTodayDraw: {pageNumber: number; numberOfRecords: number}) {
    
    const bearerToken = sessionStorage.getItem('token')
    // debugger
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      
      const httpOptions = { headers}
      return this.http.post(`${this.baseUrl}${this.getTodayDrawUrl}`, credentialsTodayDraw, httpOptions)
    } else {
      // alert('You were logged out due to error. Try logging back in.');
      this.router.navigate(['/login'])
      sessionStorage.clear()
    }
    return new Observable<any>();
  }
  getTodayDrawVendor(credentialsTodayDraw: {pageNumber: number; numberOfRecords: number}) {
    
    const bearerToken = sessionStorage.getItem('token')
    // debugger
    if (bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      
      const httpOptions = { headers}
      return this.http.post(`${this.baseUrl}${this.getTodayDrawUrl}`, credentialsTodayDraw, httpOptions)
    } else {
      this.router.navigate(['/vendor-login'])
      sessionStorage.clear()
    }
    return new Observable<any>();
  }
  getTodayDrawWithoutToken(credentialsTodayDraw: {pageNumber: number; numberOfRecords: number}) {
    
    const bearerToken = sessionStorage.getItem('token')
    // debugger
    if (!bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });
      
      const httpOptions = { headers}
      return this.http.post(`${this.baseUrl}${this.getTodayDrawUrl}`, credentialsTodayDraw, httpOptions)
    }
    return new Observable<any>();
  }

  getDrawHistory (pagination: { pageNumber: number; numberOfRecords: number}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization' : `bearer ${bearerToken}`, 
        'Content-Type': 'application/json' 
      })
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.getDrawHistoryUrl}`, pagination, httpOptions)
    }

    return new Observable<any>()
  }

  addDraw(
    credentials: {
      ticketId: number, 
      name: string, 
      isRecurring: boolean, 
      drawDate: string,
      recurringDay: number
      tierOnePrizeId: number, 
      tierTwoPrizeId: number, 
      tierThreePrizeId: number
      megaPrizeId: number
      hasMegaPrize: boolean 
      minimumTickets: number
    } 
  ) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });

      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.addDrawUrl}`, credentials, httpOptions)
    }
    return new Observable<any>();
  }
  setConfigureWinnig(credentials: {drawBaseAmount: number, salesAllocationInPercent: number, tierOneAllocationInPercent: number, tierTwoAllocationInPercent: number, tierThreeAllocationInPercent: number}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      })
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.setconfigureWinningUrl}`, credentials, httpOptions)
    }
    return new Observable<any>()
  }
  getConfigureWin() {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      return this.http.get(`${this.baseUrl}${this.getConfigureWinnigUrl}`)
    }
    return new Observable<any>()
  }
}
