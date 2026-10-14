import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/envionment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${environment.apiUrl}${environment.endpoints.category.admin.getAll}`,
      {
        withCredentials: true
      }
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${environment.apiUrl}${environment.endpoints.category.admin.create}`,
      category,
      {
        withCredentials: true
      }
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}${environment.endpoints.category.admin.delete}/${id}`,
      {
        withCredentials: true
      }
    );
  }
}