import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  setRegisterUserData(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value)); // Persist data
  }

  setRegisterVendorData(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  getRegisterUserData(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null; // Parse stored data
  }

  getRegisterVendorData(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null; // Parse stored data
  }

  clearRegisterUserDataData(): void {
    sessionStorage.clear(); 
  }
  clearRegisterVendorDataData(): void {
    sessionStorage.clear(); 
  }
}
