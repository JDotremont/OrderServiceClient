import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<any[]> {
    // get products from API
    return this.httpClient.get<any[]>( environment.apiUrl + '/customers');
  }

add(customer: any){
    return this.httpClient.post<any>( environment.apiUrl + '/customers', customer);
}

getCustomer(id: number): Observable<any> {
  return this.httpClient.get<any>( environment.apiUrl + '/customers/' + id);
}

updateCustomer(id: number, customer: any): Observable<any> {
  return this.httpClient.put<any>( environment.apiUrl + '/customers/' + id, customer);
}

deleteCustomer(id: number): Observable<any> {
  return this.httpClient.delete<any>( environment.apiUrl + '/customers/' + id);
}

}
