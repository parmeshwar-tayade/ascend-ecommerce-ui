import { Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';

export const USER_ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login')
        .then(c => c.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./register/register')
        .then(c => c.Register)
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./profile/profile')
        .then(c => c.Profile)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password')
        .then(c => c.ForgotPassword)
  }
  
];


