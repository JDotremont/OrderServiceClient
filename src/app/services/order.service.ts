import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<any[]> {
    // get orders from API
    return this.httpClient.get<any[]>( environment.apiUrl + '/orders');
  }

  add(order: any){
    return this.httpClient.post<any>( environment.apiUrl + '/orders', order);
  }
}
