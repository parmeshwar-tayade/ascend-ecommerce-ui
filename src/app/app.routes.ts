import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./features/public/public.routes')
        .then(r => r.PUBLIC_ROUTES)
  },

  {
    path: 'login',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },

  {
    path: 'register',
    redirectTo: 'user/register',
    pathMatch: 'full'
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.routes')
        .then(r => r.USER_ROUTES)
  },

  {
    path: 'customer',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/customer/customer.routes')
        .then(r => r.CUSTOMER_ROUTES)
  },

  {
    path: 'cart',
    canActivate: [authGuard],
    redirectTo: 'customer/cart',
    pathMatch: 'full'
  },

  {
    path: 'checkout',
    canActivate: [authGuard],
    redirectTo: 'customer/checkout',
    pathMatch: 'full'
  },

  {
    path: 'orders',
    canActivate: [authGuard],
    redirectTo: 'customer/orders',
    pathMatch: 'full'
  },

  {
    path: 'admin',
    canActivate: [
      authGuard,
      roleGuard
    ],
    data: {
      roles: ['ADMIN']
    },
    loadChildren: () =>
      import('./features/admin/admin.routes')
        .then(r => r.ADMIN_ROUTES)
  },

  {
    path: '**',
    redirectTo: ''
  }

];