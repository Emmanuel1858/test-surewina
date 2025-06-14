import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private baseUrl = environment.baseUrl
  private addPrizeUrl = environment.prize.addPrize
  private getPrizeUrl = environment.prize.getAllPrize


  constructor(private http: HttpClient, 
    private router: Router
  ) { }
  getAllPrize() {
    const bearerToken = sessionStorage.getItem('token')
    if (bearerToken) {
      const headers = new HttpHeaders().set('Authorization', `bearer ${bearerToken}`)
      return this.http.get(`${this.baseUrl}${this.getPrizeUrl}`, {headers})
    } else {
      this.router.navigate(['/admin-login'])
    }
    return new Observable<any>();
  }

  addPrize(credentials: {
    name: string,
    prizeTier: number,
    estimatedPrice: number,
    image: string
  }) {
    const bearerToken = sessionStorage.getItem('token')
    if(bearerToken) {
      const headers = new HttpHeaders({
        'Authorization' : `bearer${bearerToken}`,
        'Content-Type' : 'application/json'
      })
      return this.http.post(`${this.baseUrl}${this.addPrizeUrl}`, credentials, {headers} )
    }
    return new Observable<any>()
  }
}
