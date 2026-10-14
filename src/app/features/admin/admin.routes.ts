import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard')
        .then(c => c.Dashboard)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./products/product-management/product-management')
        .then(c => c.ProductManagement)
  },

  {
    path: 'products/create',
    loadComponent: () =>
      import('./products/create-product/create-product')
        .then(c => c.CreateProduct)
  },

  {
    path: 'products/update/:id',
    loadComponent: () =>
      import('./products/update-product/update-product')
        .then(c => c.UpdateProduct)
  },

  {
    path: 'products/:id',
    loadComponent: () =>
      import('./products/product-details/product-details')
        .then(c => c.ProductDetails)
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./order-management/order-management')
        .then(c => c.OrderManagement)
  },

  {
    path: 'users',
    loadComponent: () =>
      import('./user-management/user-management')
        .then(c => c.UserManagement)
  },

  {
    path: 'inventory',
    loadComponent: () =>
      import('./products/product-management/product-management')
        .then(c => c.ProductManagement)
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/category-management/category-management')
        .then(c => c.CategoryManagement)
  },

  {
    path: 'categories/create',
    loadComponent: () =>
      import('./categories/create-category/create-category')
        .then(c => c.CreateCategory)
  },

  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];