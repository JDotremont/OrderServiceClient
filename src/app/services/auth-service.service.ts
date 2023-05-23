import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isConnected$: BehaviorSubject < boolean > = new BehaviorSubject<boolean>(false);
  private connectedUser: User | null = null;

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
  ) {
    if(localStorage.getItem('token')) {
      this.isConnected$.next(true);
    }
  }

hasRole(role: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === role;
}

login(user: any) {
  return this.http.post<any>(environment.apiUrl + '/login', user)
    .pipe(map((res) => {
      console.log(res.token);
      
      if(res.token) {
        this.isConnected$.next(true);
        this.connectedUser = this.jwtHelper.decodeToken(res.token) as User;
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(this.connectedUser));
        
      }
      console.log(this.connectedUser);
      return res;
      
    }));
}


logout() {
  this.isConnected$.next(false);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.connectedUser = null;
}


  get isLogged() {
    return this.isConnected$.value;
  }

}
