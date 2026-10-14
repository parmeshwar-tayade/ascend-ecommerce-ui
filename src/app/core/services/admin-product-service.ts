import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/envionment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private readonly http = inject(HttpClient);

  getAllProductsForAdmin(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}${environment.endpoints.product.admin.getAll}`,
      { withCredentials: true }
    );
  }

  getProductByIdForAdmin(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${environment.apiUrl}${environment.endpoints.product.admin.getById}/${id}`,
      { 
        withCredentials: true 
    }
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${environment.apiUrl}${environment.endpoints.product.admin.create}`,
      product,
      { withCredentials: true }
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${environment.apiUrl}${environment.endpoints.product.admin.update}/${id}`,
      product,
      { withCredentials: true }
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}${environment.endpoints.product.admin.delete}/${id}`,
      { withCredentials: true }
    );
  }
}
