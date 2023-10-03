import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private RiderBaseUrl:string = "https://localhost:7248/api/User/"
  private DriverBaseUrl:string = "https://localhost:7248/api/Driver/"
  constructor (private http: HttpClient) { }
  signUpRider (userObj: any){
    return this.http.post<any> (`${this.RiderBaseUrl}register`, userObj);
  }
  loginRider (loginObj: any){
    return this.http.post<any>(`${this.RiderBaseUrl}authenticate`, loginObj);
  }

  signUpDriver (userObj: any){
    return this.http.post<any> (`${this.DriverBaseUrl}driverRegister`, userObj);
  }
  loginDriver (loginObj: any){
    return this.http.post<any>(`${this.DriverBaseUrl}driverAuthenticate`, loginObj);
  }  

}
