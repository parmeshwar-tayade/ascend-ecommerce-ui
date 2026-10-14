import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list')
        .then(c => c.ProductList)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/product-details/product-details')
        .then(c => c.ProductDetails)
  }
];