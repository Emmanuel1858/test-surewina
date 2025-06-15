import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private baseUrl: string = environment.baseUrl
  private analyticsAdminUrl = environment.analytics
  private analyticsSaleSummaryUrl = environment.analytics.getAnalyticsSalesSummary

  constructor(private http: HttpClient, private router: Router) { }
  analyticsAdmin() {
    // debugger
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      });

      const httpOptions = { headers }
      // debugger
      return this.http.get(`${this.baseUrl}Analytics/GetOverallSummary?countype=2`, httpOptions)
    } else {
      // console.log(bearerToken, 'pknoibh')
      this.router.navigate(['/admin-login'])
    }
    // this.router.navigate(['/admin-dashboard'])
    return new Observable<any>();
  }

  analyticsSaleSummary(pagination: {pageNumber: number, numberOfRecords: number}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization': `bearer ${bearerToken}`,
        'Content-Type' : 'application/json'
      })

      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.analyticsSaleSummaryUrl}`, pagination, httpOptions)
    } else {
      this.router.navigate(['/admin-login'])
    }
    return new Observable<any>()
  }
}
