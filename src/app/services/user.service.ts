import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<any[]> {
    // get users from API
    return this.httpClient.get<any[]>( environment.apiUrl + '/users');
  }

  add(user: any){
    return this.httpClient.post<any>( environment.apiUrl + '/users', user);
  }

  delete(id: number){
    return this.httpClient.delete<any>( environment.apiUrl + '/users/' + id);
  }

  update(user: any){
    return this.httpClient.put<any>( environment.apiUrl + '/users/' + user.id, user);
  }

}
