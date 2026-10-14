import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../home/home')
        .then(c => c.Home)
  },

  {
    path: 'products',
    loadChildren: () =>
      import('../public/products/product.routes')
        .then(r => r.PRODUCT_ROUTES)
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('../admin/categories/category-management/category-management')
        .then(c => c.CategoryManagement)
  }
];
