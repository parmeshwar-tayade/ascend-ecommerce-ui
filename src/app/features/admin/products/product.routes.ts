import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  
  {
    path: 'create',
    loadComponent: () =>
      import('./create-product/create-product')
        .then(c => c.CreateProduct)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-details/product-details')
        .then(c => c.ProductDetails)
  }
];