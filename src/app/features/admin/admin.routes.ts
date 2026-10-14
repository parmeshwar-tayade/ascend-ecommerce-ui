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
      import('./product-management/product-management')
        .then(c => c.ProductManagement)
  },

  {
    path: 'products/create',
    loadComponent: () =>
      import('./product-management/create-product/create-product')
        .then(c => c.CreateProduct)
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
    path: 'categories',
    loadComponent: () =>
      import('./category-management/category-management')
        .then(c => c.CategoryManagement)
  },

  {
    path: 'categories/create',
    loadComponent: () =>
      import('./category-management/create-category/create-category')
        .then(c => c.CreateCategory)
  }
];