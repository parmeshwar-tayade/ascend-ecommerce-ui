import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/envionment';
import { UserProfile } from '../models/user-profile';
import { RegisterRequest } from '../models/register.request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  register(request: RegisterRequest) {
    return this.http.post(
      `${environment.apiUrl}${environment.endpoints.user.register}`,
      request
    );
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${environment.apiUrl}${environment.endpoints.user.getProfile}`
    );
  }

  getUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.endpoints.user.getUsers}`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`);
  }

  changePassword(
    payload: unknown
  ): void {

    console.log(payload);
  }

  getAddresses(): void {

    console.log('Addresses');
  }
}