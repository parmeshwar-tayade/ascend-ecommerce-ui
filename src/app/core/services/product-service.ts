import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from '../../../environment/envionment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerProductService {

  private readonly http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}${environment.endpoints.product.customer.getAll}`,
      {
        withCredentials: true
      }
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${environment.apiUrl}${environment.endpoints.product.customer.getById}/${id}`,
      {
        withCredentials: true
      }
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const params = new HttpParams().set('keyword', keyword);

    return this.http.get<Product[]>(
      `${environment.apiUrl}${environment.endpoints.product.customer.search}`,
      {
        params,
        withCredentials: true
      }
    );
  }
}