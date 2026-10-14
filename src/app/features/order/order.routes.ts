import { Routes } from '@angular/router';

export const ORDER_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./order-list/order-list')
        .then(c => c.OrderList)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./order-details/order-details')
        .then(c => c.OrderDetails)
  }

];
