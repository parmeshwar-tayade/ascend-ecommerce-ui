import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./features/home/home')
        .then(c => c.Home)
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product.routes')
        .then(r => r.PRODUCT_ROUTES)
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.routes')
        .then(r => r.USER_ROUTES)
  },

  {
    path: 'cart',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/cart/cart.routes')
        .then(r => r.CART_ROUTES)
  },

  {
    path: 'checkout',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/checkout/checkout.routes')
        .then(r => r.CHECKOUT_ROUTES)
  },

  {
    path: 'orders',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/order/order.routes')
        .then(r => r.ORDER_ROUTES)
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