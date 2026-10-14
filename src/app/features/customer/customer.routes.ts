import { Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../user/profile/profile')
        .then(c => c.Profile)
  },

  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./cart/cart/cart')
        .then(c => c.Cart)
  },

  {
    path: 'wishlist',
    canActivate: [authGuard],
    redirectTo: 'profile',
    pathMatch: 'full'
  },

  {
    path: 'checkout',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./checkout/checkout.routes')
        .then(r => r.CHECKOUT_ROUTES)
  },

  {
    path: 'orders',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../order/order.routes')
        .then(r => r.ORDER_ROUTES)
  },

  {
    path: 'addresses',
    canActivate: [authGuard],
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];
