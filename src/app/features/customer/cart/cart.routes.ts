import { Routes } from '@angular/router';

export const CART_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./cart/cart')
        .then(c => c.Cart)
  }

];
``