import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  catchError,
  map,
  of
} from 'rxjs';

import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  /*
   * Already logged in.
   */
  if (authService.isLoggedIn()) {
    return true;
  }

  /*
   * Browser refresh scenario.
   * Reload user profile using HttpOnly cookie.
   */
  return authService
    .getProfile()
    .pipe(

      map(() => true),

      catchError(() =>
        of(
          router.createUrlTree([
            '/user/login'
          ])
        )
      )
    );
};