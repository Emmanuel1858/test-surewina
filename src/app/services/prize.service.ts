import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private baseUrl = environment.baseUrl
  private addPrizeUrl = environment.prize.addPrize
  private getPrizeUrl = environment.prize.getAllPrize

  constructor(private http: HttpClient) { }
  getAllPrize() {
    const bearerToken = sessionStorage.getItem('token')
    if (bearerToken) {
      const headers = new HttpHeaders().set('Authorization', `bearer ${bearerToken}`)
      return this.http.get(`${this.baseUrl}${this.getPrizeUrl}`)
    }
    return new Observable<any>();
  }
}
