import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';

import {
  catchError,
  map,
  of
} from 'rxjs';

import { AuthService } from '../services/auth-service';

export const roleGuard: CanActivateFn =
(
  route: ActivatedRouteSnapshot
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles =
    route.data['roles'] as string[];

  const normalizeRoles = (roles: unknown): string[] => {
    if (!Array.isArray(roles)) {
      return [];
    }

    return roles
      .map((role) => typeof role === 'string' ? role : role?.role)
      .filter((role): role is string => !!role);
  };

  /*
   * User already loaded in signal.
   */
  const user = authService.currentUser();

  if (user) {

    const userRoles = normalizeRoles(user.roles);
    const hasRole = requiredRoles.some(role => userRoles.includes(role));

    return hasRole
      ? true
      : router.createUrlTree(['/']);
  }

  /*
   * Refresh browser scenario.
   */
  return authService
    .getProfile()
    .pipe(

      map(profile => {

        const userRoles = normalizeRoles(profile.roles);
        const hasRole = requiredRoles.some(role => userRoles.includes(role));

        return hasRole
          ? true
          : router.createUrlTree(['/']);
      }),

      catchError(() =>
        of(
          router.createUrlTree([
            '/user/login'
          ])
        )
      )
    );
};