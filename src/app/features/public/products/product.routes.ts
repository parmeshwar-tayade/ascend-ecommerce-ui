import { Routes } from "@angular/router";

export const PRODUCT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        loadComponent: () =>
            import('./product-list/product-list')
                .then(c => c.ProductList)
    },
    {
        path: 'details/:id',
        loadComponent: () =>
            import('./product-details/product-details')
                .then(c => c.ProductDetails)
    },
];