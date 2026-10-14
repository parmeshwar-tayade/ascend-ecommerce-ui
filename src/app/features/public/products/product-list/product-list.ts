import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../../../core/models/product.model';
import { CustomerProductService } from '../../../../core/services/customer-product-service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private readonly productService = inject(CustomerProductService);

  products: Product[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getAllProductsForCustomer().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load products right now. Please try again later.';
        this.products = [];
        this.loading = false;
      }
    });
  }
}
