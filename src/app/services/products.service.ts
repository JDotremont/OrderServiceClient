import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<any[]> {
    // get products from API
    return this.httpClient.get<any[]>( environment.apiUrl + '/products');
  }

  add(product: any){
    return this.httpClient.post<any>( environment.apiUrl + '/products', product);
  }

  delete(id: number){
    return this.httpClient.delete<any>( environment.apiUrl + '/products/' + id);
  }
}
