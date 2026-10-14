import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Category } from '../../../../core/models/category.model';
import { Product } from '../../../../core/models/product.model';
import { AdminProductService } from '../../../../core/services/admin-product-service';
import { CategoryService } from '../../../../core/services/category-service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(AdminProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);

  readonly categories = signal<Category[]>([]);

  readonly form = this.fb.nonNullable.group({
    productName: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    sku: [''],
    brand: [''],
    imageUrls: [''],
    categoryName: ['', Validators.required]
  });

  submitted = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        const normalizedCategories = categories ?? [];
        this.categories.set(normalizedCategories);

        this.form.patchValue({
          categoryName: normalizedCategories[0]?.categoryName ?? ''
        });
      },
      error: () => {
        this.errorMessage = 'Unable to load categories.';
        this.categories.set([]);
        this.form.patchValue({ categoryName: '' });
      }
    });
  }

  submit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const imageUrls = (this.form.value.imageUrls ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    const payload: Product = {
      productName: this.form.value.productName ?? '',
      description: this.form.value.description ?? '',
      price: Number(this.form.value.price ?? 0),
      discountPrice: undefined,
      stockQuantity: Number(this.form.value.stockQuantity ?? 0),
      sku: this.form.value.sku ?? '',
      brand: this.form.value.brand ?? '',
      imageUrls,
      categoryName: this.form.value.categoryName ?? ''
    };

    this.productService.createProduct(payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: () => {
        this.errorMessage = 'Unable to create product. Please try again.';
      }
    });
  }
}
