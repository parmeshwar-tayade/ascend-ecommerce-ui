import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';

import { Product } from '../../../core/models/product.model';
import { AdminProductService } from '../../../core/services/admin-product-service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  styleUrl: './product-management.css',
  templateUrl: './product-management.html',
})
export class ProductManagement implements OnInit {
  private readonly productService = inject(AdminProductService);
  private readonly router = inject(Router);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly displayedColumns = ['id', 'name', 'category', 'price', 'stock', 'status', 'actions'];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productService.getAllProductsForAdmin().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load products.');
        this.products.set([]);
        this.loading.set(false);
      }
    });
  }

  viewProduct(productId?: number): void {
    if (!productId) {
      return;
    }

   // this.loading.set(true);
   // this.errorMessage.set('');

    this.productService.getProductByIdForAdmin(productId).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/products', productId]);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Unable to load product details.');
      }
    });
  }

  deleteProduct(id?: number): void {
    if (!id) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: () => {
        this.errorMessage.set('Unable to delete product.');
      }
    });
  }
}
