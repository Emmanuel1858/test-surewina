import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrizeDepotService {
  private baseUrl = environment.baseUrl
  private getPrizeDepotUrl = environment.prizeDepot.getDepot
  private addPrizeDepotUrl = environment.prizeDepot.addDepot


  constructor(private http: HttpClient) { }


  getPrizeDepot(pagination: {pageNumber: number; numberOfRecords: number;}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization' : `bearer${bearerToken}`,
        'Content-Type' : 'application/json'
      })
      const httpOptions = { headers }
      return this.http.post (`${this.baseUrl}${this.getPrizeDepotUrl}`, pagination, httpOptions )
    }
    return new Observable<any>()
  }

  addPrizeDepot(credentials: { name: string; address: string; image: string}) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization' : `bearer${bearerToken}`,
        'Content-Type' : 'application/json'
      })
      
      const httpOptions = { headers }
      return this.http.post(`${this.baseUrl}${this.addPrizeDepotUrl}`, credentials, httpOptions)
    }

    return new Observable<any>()
  }
}
