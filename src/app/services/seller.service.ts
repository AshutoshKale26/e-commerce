import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from '../../../signup.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  sellerSignup(signupData: Signup): Observable<any> {
    console.log('Signup Data:', signupData);
    console.warn("service called")

    return this.http.post('http://localhost:3000/seller', signupData);
  }

  userLogin(loginData: Login): Observable<any> {
    console.log('Login Data:', loginData);
    console.warn("Login service called")

    const url = `http://localhost:3000/seller?password=${loginData.password}&email=${loginData.email}`;
    return this.http.get<any[]>(url); // Note: Specify the return type as an array
  }

  updateProfile(updatedProfile: Signup): Observable<any> {
    console.log('Updating Profile:', updatedProfile);
    const url = `http://localhost:3000/seller/${updatedProfile.id}`; // Assuming you have an ID for each seller
    return this.http.put(url, updatedProfile);
  }
  
}
