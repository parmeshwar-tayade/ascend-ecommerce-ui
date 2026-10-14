import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { LoginRequest } from '../models/login.request.model';
import { LoginResponse } from '../models/login.response.model';
import { environment } from '../../../environment/envionment';
import { UserProfile } from '../models/user-profile';
import { ForgotPasswordRequest } from '../models/forgot-password-request.model';
import { ForgotPasswordResponse } from '../models/forgot-password-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private normalizeRoles(roles: unknown): string[] {
    if (!Array.isArray(roles)) {
      return [];
    }

    return roles
      .map((role) => typeof role === 'string' ? role : role?.role)
      .filter((role): role is string => !!role);
  }

  readonly currentUser =
    signal<UserProfile | null>(null);

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}${environment.endpoints.auth.login}`,
      request,
      {
        withCredentials: true
      }
    ).pipe(
      tap(user => {
        console.log('LOGIN RESPONSE', user);
        this.currentUser.set(user as any);
      })
    );
  }

  getProfile(): Observable<UserProfile> {

    return this.http.get<UserProfile>(
      `${environment.apiUrl}/users/profile`,
      {
        withCredentials: true
      }
    ).pipe(
      tap(user => this.currentUser.set(user))
    );
  }

  refreshToken(): Observable<void> {

    return this.http.post<void>(
      `${environment.apiUrl}${environment.endpoints.auth.refreshToken}`,
      {},
      {
        withCredentials: true
      }
    );
  }

  logout(): Observable<string> {

    return this.http.post(
      `${environment.apiUrl}${environment.endpoints.auth.logout}`,
      {},
      {
        withCredentials: true,
        responseType: 'text'
      }
    ).pipe(
      tap(() => this.currentUser.set(null))
    );
  }

  getUser(): UserProfile | null {
    return this.currentUser();
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  hasRole(role: string): boolean {

    const user = this.currentUser();

    if (!user) {
      return false;
    }

    return this.normalizeRoles(user.roles).includes(role);
  }

  hasAnyRole(roles: string[]): boolean {

    const user = this.currentUser();

    if (!user) {
      return false;
    }

    const userRoles = this.normalizeRoles(user.roles);
    return roles.some(role => userRoles.includes(role));
  }

  forgotPassword(
    request: ForgotPasswordRequest
  ): Observable<ForgotPasswordResponse> {

    return this.http.post<ForgotPasswordResponse>(
      `${environment.apiUrl}${environment.endpoints.auth.forgotPassword}`,
      request,
      {
        withCredentials: true
      }
    );
  }

}