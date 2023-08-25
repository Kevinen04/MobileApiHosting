import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated() {
    return this.getUserId() !== null;
  }

  public authenticate(userId: string) {
    localStorage.setItem('userId', userId);
  }

  public getUserId(): string {
    return localStorage.getItem('userId') as string;
  }
}
