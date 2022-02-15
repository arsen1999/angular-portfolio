import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = JSON.parse(localStorage.getItem('user')) || {
    email: '',
    password: ''
  };

  public logOut(): void {
    this.user = {
      email: '',
      password: ''
    }
    localStorage.clear();
  }

  constructor() {
  }

}
