import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  
    public isAuthenticated(){
    return localStorage.getItem('userId') !==null;
  }

  public authenticate(userId: string){
    localStorage.setItem('userId', userId);
  }
}
