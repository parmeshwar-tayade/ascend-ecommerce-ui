import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Category } from '../../../core/models/category.model';
import { Product } from '../../../core/models/product.model';
import { AdminProductService } from '../../../core/services/admin-product-service';
import { CategoryService } from '../../../core/services/category-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly productService = inject(AdminProductService);
  private readonly categoryService = inject(CategoryService);

  readonly loading = signal(false);
  readonly products = signal<Product[]>([]);
  readonly categories = signal<Category[]>([]);

  readonly totalProducts = computed(() => this.products().length);
  readonly totalCategories = computed(() => this.categories().length);
  readonly totalInventory = computed(() =>
    this.products().reduce((total, product) => total + (product.stockQuantity ?? product.stockQuantity ?? 0), 0)
  );
  readonly lowStockProducts = computed(() =>
    this.products().filter((product) => (product.stockQuantity ?? product.stockQuantity ?? 0) < 10)
  );
  readonly totalRevenue = computed(() =>
    this.products().reduce(
      (total, product) => total + ((product.price ?? 0) * (product.stockQuantity ?? product.stockQuantity ?? 0)),
      0
    )
  );

  readonly stats = computed(() => [
    { label: 'Total Products', value: this.totalProducts(), tone: 'primary' },
    { label: 'Categories', value: this.totalCategories(), tone: 'accent' },
    { label: 'Inventory', value: this.totalInventory(), tone: 'warn' },
    { label: 'Revenue', value: `$${this.totalRevenue().toLocaleString()}`, tone: 'success' }
  ]);

  readonly topProducts = computed(() =>
    [...this.products()]
      .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
      .slice(0, 4)
  );

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading.set(true);

    forkJoin({
      products: this.productService.getAllProductsForAdmin(),
      categories: this.categoryService.getCategories(),
    }).subscribe({
      next: ({ products, categories }) => {
        this.products.set(products ?? []);
        this.categories.set(categories ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.products.set([]);
        this.categories.set([]);
        this.loading.set(false);
      }
    });
  }
}
