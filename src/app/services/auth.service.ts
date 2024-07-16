// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(this.getUserName());
  public userName$ = this.userNameSubject.asObservable();

  private userTypeSubject = new BehaviorSubject<string | null>(this.getUserType());
  public userType$ = this.userTypeSubject.asObservable();

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  login(userType: string, userName: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    localStorage.setItem('userName', userName);
    this.loggedInSubject.next(true);
    this.userTypeSubject.next(userType);
    this.userNameSubject.next(userName);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('sellerData');
    localStorage.removeItem('userData');
    this.loggedInSubject.next(false);
    this.userTypeSubject.next(null);
    this.userNameSubject.next(null);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  private getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  private getUserType(): string | null {
    return localStorage.getItem('userType');
  }
}
