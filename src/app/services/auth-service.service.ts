import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl: string = environment.baseUrl
  private registerUserUrl: string = environment.authentication.registerUser
  private loginUserUrl: string = environment.authentication.loginUser
  private registerVendorUrl: string = environment.authentication.registerVendor
  private loginVendorUrl: string = environment.authentication.loginVendor

  constructor(private http: HttpClient) { }

  registerUser(credentialsRegisterUser: {firstName: string; lastName: string; phoneNumber: string; password: string; email: string; referredBy: string; isConscient: boolean}): Observable <any> {
    return this.http.post(`${this.baseUrl}${this.registerUserUrl}`, credentialsRegisterUser, {
      headers: { 'Content-Type': 'application/json' },
    })
    
  }

  // registerVendor(credentialsRegisterVendor: {firstName: string; lastName: string; phoneNumber: string; password: string; email: string; referredBy: string; isConscient: boolean}): Observable <any> {
  //   return this.http.post(`${this.baseUrl}${this.registerUserUrl}`, credentialsRegisterUser, {
  //     headers: { 'Content-Type': 'application/json' },
  //   })
    
  // }

  loginUser(credentialsLoginUser: {user: string; password: string}): Observable <any> {
    return this.http.post(`${this.baseUrl}${this.loginUserUrl}`, credentialsLoginUser, {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
