import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private baseUrl = environment.baseUrl
  private getTodayDrawUrl = environment.draw.getTodayDraw
  
  constructor(private http: HttpClient) { }
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
    }
    return new Observable<any>();
  }
}
